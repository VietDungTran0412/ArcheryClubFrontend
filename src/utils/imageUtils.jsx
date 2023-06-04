export const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

export const heroTextureImports = importAll(
    require.context("../assets/background", false, /\.(png|jpe?g|svg)$/)
)

export const heroSingleImports = importAll(
    require.context("../assets", false, /^about.(png|jpe?g|svg)$/)
)
