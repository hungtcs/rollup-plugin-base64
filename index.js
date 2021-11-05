const { createFilter } = require("@rollup/pluginutils");
const {readFileSync} = require("fs");

function base64(opts = {}) {
  if (!opts.include) {
    throw Error("include option must be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "base64",
    transform(data, id) {
      if (filter(id)) {
        const fileData = fs.readFileSync(id);
        return {
          code: `export default "data:${mime.lookup(id)};base64,${fileData.toString('base64')}";`,
          map: {
            mappings: "",
          },
        };
      }
    }
  };
}

exports.base64 = base64;
