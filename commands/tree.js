const fs = require('fs');
const path = require('path');

const treeFn = (dirPath) => {
    // validate the input directory path
    if (!dirPath) {
        treeHelper(process.cwd(), "");
        return;
    } else if (!fs.existsSync(dirPath)) {
        console.log(`given path doesn't exist: ${dirPath}`);
        return;
    }

    treeHelper(dirPath, "");
};

const treeHelper = (dirPath, indent) => {
    if (fs.lstatSync(dirPath).isFile()) {
        const fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        const dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        
        const children = fs.readdirSync(dirPath);
        for (let i = 0; i < children.length; i++) {
            const childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "    ");
        }
    }
};

module.exports = { treeFn };