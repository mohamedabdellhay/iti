import fs from "fs/promises";
const fetchJsonData = async function (file, topicId = null) {
  const bufferData = await fs.readFile(file);
  const data = JSON.parse(bufferData.toString());
  if (topicId) {
    return data.filter((topic) => topic.id == topicId);
  }

  return data;
};

export { fetchJsonData };
