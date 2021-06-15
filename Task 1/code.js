class PrintMachine{
    size
    color
    family
    constructor(size, color, family) {
        this.size = size;
        this.color = color;
        this.family = family;
    }
    
    print(text)
    {
        document.write(
            `<p style="font-size:${this.size}px; color:${this.color}; font-family:${this.family}">` +
            text +
            `</p>`);
    }
}

let pm = new PrintMachine(30, "red", "Times new Roman");
pm.print("Some text");