function getFilePaths(folder, path = "") {
  let filePaths = []; // Initialize an array to store file paths

  for (let key in folder) { // Iterate over each key in the folder object
    let newPath = path ? `${path}/${key}` : key; // Construct the file path

    if (folder[key] === "file") { 
      // If the value is "file", it means it's a file, so add the path to the result
      filePaths.push(newPath);
    } else if (typeof folder[key] === "object" && Object.keys(folder[key]).length > 0) { 
      // If the value is an object and it's not empty, recurse into it
      filePaths.push(...getFilePaths(folder[key], newPath));
    }
    // If the object is empty, it's an empty folder, so we skip it
  }

  return filePaths; // Return the accumulated file paths
}

// Complex folder structure example
const complexFolderStructure = {
  src: {
    components: {
      Button: {
        "index.js": "file",
        "style.css": "file",
        tests: {
          "button.test.js": "file"
        }
      },
      Header: {
        "header.js": "file",
        "header.css": "file",
        assets: {
          images: {
            "logo.png": "file",
            "banner.jpg": "file"
          }
        }
      }
    },
    utils: {
      "helpers.js": "file",
      "constants.js": "file",
      deepUtils: {
        moreUtils: {
          "deepHelper.js": "file"
        }
      }
    },
    emptyFolder: {} // This is an empty folder and will be skipped
  },
  public: {
    "index.html": "file",
    assets: {
      images: {
        "favicon.ico": "file",
        backgrounds: {
          "background1.png": "file",
          "background2.png": "file"
        }
      }
    }
  }
};

// Get file paths from the nested structure
const result = getFilePaths(complexFolderStructure);
console.log(result); // Output all file paths
