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

function GetInOuts(id, in_n, out_n) {
    id = id.replaceAll(" ", "_");
    let inputs = [];
    for (let i = 0; i < in_n; i++) {
        inputs.push(document.body.querySelector(`#${id}_input${i + 1}`));
    }

    if(out_n === 0) return inputs;

    let outputs = [];
    for (let i = 0; i < out_n; i++) {
        outputs.push(document.body.querySelector(`#${id}_output${i + 1}`));
    }
    return {inputs: inputs, outputs: outputs};
}


function Print() {
    let inputs = GetInOuts("Print", 4, 0);
    let size = inputs[1].value;
    let color = inputs[2].value
    let family = inputs[3].value;
    if (size !== "" && color !== "" && family !== "") {
    let pm = new PrintMachine(size, color, family);
    pm.print(inputs[0].value);
    }
}
