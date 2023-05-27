window.onload = () => {
    assetsUnpack();
}
function assetsUnpack() {
    const assets_ = document.getElementById("assets");
    const assets = {
        logo: {
            logoBl: assets_.getElementsByClassName('logoBl')[0],
            logoLs: assets_.getElementsByClassName('labShop')[0],
            logoBiot: assets_.getElementsByClassName('bengkelIot')[0]
        }
    };

    // unpack individually
    /**logos*/
    {
        for (const logo of Object.keys(assets.logo)) {
            let tags = [...document.getElementsByTagName(logo)];
            for (const tag of tags)
                replaceFlagSize(tag, assets.logo[logo]);
        }
    }
}


async function replaceFlagSize(target, asset) {
    // TODO: make frontend config file
    const originalWidth = 717;
    const originalHeight = 225;

    const sizes = {//(width)
        normal: 340,
        big: originalWidth,
        small: 213,
    }
    let width = target.dataset.sizes
    if (!width | width == "") width = 'normal';
    let buffer = parseInt(width); //this code from .ts ok /_ \, im lazy
    if (buffer) width = buffer;

    // copy from asset
    const container = asset.cloneNode(true);
    const logo = container.firstElementChild;

    // calculate scale
    let transformValue =
        typeof width == 'number' ?
            (width / originalWidth) :
            sizes[width] / originalWidth;

    if (typeof width == 'string') width = sizes[width];
    let height = (originalHeight / originalWidth) * width;

    // set size
    logo.style.height = `${height / transformValue}px`;
    logo.style.width = `${width / transformValue}px`;

    // set scale
    logo.style.transformOrigin = 'top left';
    logo.style.transform = `scale(${transformValue})`;

    // set hitbox
    container.style.height = `${height}px`;
    container.style.width = `${width}px`;
    // replace
    target.replaceWith(container);
}