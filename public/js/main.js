var assets_;

window.onload = () => {
    assetsUnpack();
}
function assetsUnpack() {
    assets_ = document.getElementById("assets");
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
    // render width and height for a bit
    const originalDisplay = assets_.style.display;
    assets_.style.display = "block"

    // get original size
    const originalWidth = asset.offsetWidth * 21 / 20; //(x+x*5%); 5% = gap value
    const originalHeight = asset.offsetHeight;

    // copy from asset
    const container = asset.cloneNode(true);
    const logo = container.firstElementChild;

    assets_.style.display = originalDisplay;

    const sizes = {//(width)
        normal: 340,
        big: originalWidth,
        small: 213,
    }

    let width = target.dataset.sizes;
    let width_ = parseInt(width);
    if (!width | width == "") width = 'normal';
    if (!width_) width = sizes[width];
    else width = width_;

    let height = (originalHeight / originalWidth) * width;

    // calculate scale
    let transformValue = (width / originalWidth)


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