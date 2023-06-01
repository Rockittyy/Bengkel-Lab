class bars {
    constructor(element, persentage = 0) {
        this.element = element.querySelector(".fill");
        var persen = persentage;
        if (element.dataset.fill)
            persen = element.dataset.fill;
            this.persentage = persen 
    };
    set persentage(persen) {
        this.persentage_ = persen;
        this.element.style.width = `${persen}%`
    }
    get persentage() {
        return this.persentage_;
    }
}
