module.exports = {
  "*.ts?(x)": () => "npm run typecheck",
  "*.{ts,tsx,css}": (filenames) =>
    `next lint --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(" --file ")}`,
};
