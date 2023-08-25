const fs = require('fs');
const path = require('path');
const utility = require('./../utility');

const organizeFn = (dirPath) => {
    // validate the input directory path
    if (!dirPath) {
        dirPath = process.cwd();
    } else if (!fs.existsSync(dirPath)) {
        console.log(`given path doesn't exist: ${dirPath}`);
        return;
    }

    // create new directory 'organized_files'
    const destinationPath = path.join(dirPath, "OrganizedFiles");
    
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }

    // identify categories of files from their extensions and send to respective folders
    organizeHelper(dirPath, destinationPath);
};

// To identify categories of files in directory from their extensions
const organizeHelper = (src, dest) => {
    const childNames = fs.readdirSync(src);
    
    for (let i = 0; i < childNames.length; i++) {
        const childPath = path.join(src, childNames[i]);

        if (fs.lstatSync(childPath).isFile()) {
            let category = getCategory(childNames[i]);
            
            // copy (or cut) them to separate folders for separate categories in 'organized_files'
            sendFiles(childPath, dest, category);
        }
    }
};

// To search the category in the 'types' object
const getCategory = (fileName) => {
    const extension = path.extname(fileName).slice(1);
    const types = utility.types;

    for (type in types) {
        const categoryTypeArray = types[type];
        for (let i = 0; i < categoryTypeArray.length; i++) {
            if (extension === categoryTypeArray[i]) {
                return type;
            }
        }
    }

    return "others";
};

// To copy/cut them to separate folders for separate categories in 'organized_files'
const sendFiles = (srcFilePath, destPath, category) => {
    const categoryPath = path.join(destPath, category);

    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
    }

    const fileName = path.basename(srcFilePath);
    const destFilePath = path.join(categoryPath, fileName);

    fs.copyFileSync(srcFilePath, destFilePath);

    console.log(fileName, "copied to", category);
};

module.exports = { organizeFn };