const fs = require("fs");
const path = require("path");

const data = {
  entry: 123,
  value: 1,
};

const createFile = async () => {
  return new Promise((res, rej) => {
    const fileName = "data.json";
    const filePath = `./tmp/${fileName}`;
    const downloadWQdir = path.dirname(filePath);
    if (!fs.existsSync(downloadWQdir)) {
      fs.mkdirSync(downloadWQdir, { recursive: true });
    }
    console.log(fs.writeFileSync(filePath, JSON.stringify(data)));
    const url = `http://localhost:2200/v1/test/download/${fileName}`; //${config.get("app").publicUrl}/api/meeting/${meetingId}/webinar/download/${fileName}?token=${token}`;

    res(url);
  });
};

const downloadWebinarFile = async (fileName, res) => {
  try {
    res.sendFile(`/tmp/${fileName}`);
  } catch (e) {
    console.log("erroreeeeeeeeeeeeeeee", e);
    return res
      .status(400)
      .send(JSON.stringify({ customCode: 401, message: "INVALID_TOKEN" }));
  }
};

module.exports = {
  createFile,
  downloadWebinarFile,
};
