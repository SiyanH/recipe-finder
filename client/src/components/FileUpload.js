import React, { useState } from "react";
import Message from "./Message";
import axios from "axios";
import "../common/style.css";

const getRecipes = async (dishes) => {
  let response = {};
  try {
    response = await axios.get(
      `**REMOVED**`
    );
  } catch {
    console.error("There's an error while fetching the data");
  } finally {
    return response;
  }
};

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [labels, setLabels] = useState([]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath, resultSummaries } = res.data;

      const labelsWithRecipe = await Promise.all(
        resultSummaries.map(async (label) => {
          const recipe = await getRecipes(label.description);

          if (recipe && recipe.data && recipe.data.hits) {
            return { ...label, recipe: recipe.data.hits[0].recipe };
          }
          return { label, recipe: null };
        })
      );

      setUploadedFile({ fileName, filePath });
      setLabels(labelsWithRecipe);

      setMessage(
        "File Uploaded (If file is uploaded and Google AI doesn't render, please logout, refresh and log in.)"
      );
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div className='justify-content-center'>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file ">
          <input
            type="file"
            className="custom-file-input form-control app-margin-block "
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-block app-margin-block app-primary-button"
        />
      </form>
      {/* Uploaded file renders make title look better (if possible align */}
      {uploadedFile ? (
        <div className="row mt-5 justify-content-center">

          <div className="col-md-6 m-auto">
            <p className="text-center app-text-small app-text-font">{uploadedFile.fileName} </p>
            <p className="text-center app-text-small app-text-bold">If an upload is successful,
              a list of recipe matches will appear. Please copy and paste into the text search bar below the
              recipe that closest matches what you were searching for. </p>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />

          </div>

        </div>
      ) : null}
      <div>
        {labels.map(
          (label) =>
            label.description && (
              <div>
                <ul className="text-center app-text-small list-group ">
                  <li className="list-group-item">
                    Guess: {label.description} Score: {label.score}
                    {label.recipe && (
                      <>
                        <br />
                        Matched recipe to search: {label.recipe.label}
                      </>
                    )}
                  </li>
                </ul>
              </div>
            )
        )}
      </div>

    </div>

  );

};

export default FileUpload;
