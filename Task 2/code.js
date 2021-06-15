let container = document.querySelector("#news_feed_container");
let template = document.querySelector("#news_template");
let inout = GetInOuts("add", 4, 1);
let inputs = inout.inputs;
let output = inout.outputs[0];
let remove_input = document.querySelector("#remove_input");
let remove_output = document.querySelector("#remove_output");
let sort_input1 = document.querySelector("#sort_input1");
let sort_input2 = document.querySelector("#sort_input2");
let sort_output = document.querySelector("#sort_output");

class News {
    title
    text
    tags
    date
    
    constructor(title, text, tags, date) {
        this.title = title;
        this.text = text;
        this.tags = tags;
        this.date = date;
    }
    
    print()
    {
        let element = template.content.cloneNode(true);
        element.querySelector(".title").textContent = this.title;
        element.querySelector(".text").textContent = this.text;

        let tags = '';
        for (const tag of this.tags) {
            tags += " #" + tag;
        }
        element.querySelector(".tags").textContent = tags;
        
        let dd = this.date.getDate() - new Date().getDate();
        let mm = this.date.getMonth() - new Date().getMonth();
        let yy = this.date.getFullYear() - new Date().getFullYear();
        let str;
        if(yy < 0)
            str = -yy + " years ago"
        else if(mm < 0)
            str = -mm + " months ago"
        else if(dd === -1)
            str = "yesterday"
        else if(dd < 0)
            str = -dd + " days ago"
        else
            str = "today"
        element.querySelector(".date").textContent = str;
        container.append(element);
    }
}

class NewsFeed {
    news_collection
    constructor(news_collection) {
        this.news_collection = news_collection;
    }
    
    print(){
        container.innerHTML = "";
        for (const news of this.news_collection) {
            news.print();
        }
    }
    
    sort(compare)
    {
        this.news_collection = this.news_collection.sort(compare);
        this.print();
    }
    
    sort_by_property(property, desc = true)
    {
        if(this[property] === null) return false;
        
        this.sort((a, b) => {
            // let a_prop = a[property];
            // let b_prop = b[property];
            // if(desc)
            //     return b_prop - a_prop;
            // else           
            //     return a_prop - b_prop;
            
            let a_prop = a[property];
            let b_prop = b[property];
            if(a_prop < b_prop)
            {
                if (desc)
                    return 1;
                else
                    return -1;
            }
            else if(a_prop > b_prop)
            {
                if (desc)
                    return -1;
                else
                    return 1;
            }
            else
                return 0;
        });
        return true;
    }
    
    remove_by_title(title)
    {
        
        let index = this.news_collection.findIndex((a)=> a.title === title);
        if(index < 0) return false;
        this.news_collection.splice(index, 1);
        this.print();
        return true;
    }
    
    add(post)
    {
        this.news_collection.push(post);
        this.print();
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

function AddChanged() {
    let tags = inputs[2].value.split(' ');
    let date = new Date(inputs[3].value);
    let title = inputs[0].value;
    let text = inputs[1].value;
    if(title === "") {
        output.innerHTML = "Title is empty";
        return;
    }
    if(text === "") {
        output.innerHTML = "Text is empty";
        return;
    }
    if(tags[0] === "") {
        output.innerHTML = "Tags is empty";
        return;
    }
    if(isNaN(Date.parse(inputs[3].value))) {
        output.innerHTML = "Wrong date";
        return;
    }
    let post = new News(title, text, tags, date);
    news.add(post);
    for (const input of inputs) {
        input.value = '';
    }
    output.innerHTML = "Success";
}

function Remove() {
    if(news.remove_by_title(remove_input.value))
    {
        remove_input.value = '';
        remove_output.innerHTML = 'Success';
        return;
    }
    remove_output.innerHTML = 'No such title';
}

function Sort() {
    let desc;
    if(sort_input2.value === "desc")
        desc = true;
    else if(sort_input2.value === "asc")
        desc = false;
    else {
        sort_output.innerHTML = 'Asc or desc';
        return;
    }
    if(news.sort_by_property(sort_input1.value, desc))
    {
        sort_input1.value = '';
        sort_input2.value = '';
        sort_output.innerHTML = 'Success';
        return;
    }
    sort_output.innerHTML = 'No such title';
}

let news = new NewsFeed([
    new News(
    "Weather",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis mauris et neque consectetur dictum. Mauris vestibulum quam nunc, at interdum tortor ultricies eu. Aliquam id ullamcorper mauris. Suspendisse potenti. Nullam sit amet hendrerit ipsum. Phasellus eros odio, dictum nec enim vitae, placerat luctus erat. Nullam pretium suscipit erat non condimentum. Cras odio ligula, tincidunt ut dolor eget, convallis eleifend velit. Proin eu feugiat lacus. Aliquam convallis aliquam nulla, a finibus magna porttitor malesuada. Phasellus ultrices nunc sagittis, egestas velit a, mattis nisi. Nunc tincidunt, mauris ac tempor blandit, velit felis mollis mi, vitae molestie ante turpis quis velit.",
    ["Weather", "News", "Article"],
    new Date('2020-02-13T03:24:00')),
    new News(
        "Sport",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis mauris et neque consectetur dictum. Mauris vestibulum quam nunc, at interdum tortor ultricies eu. Aliquam id ullamcorper mauris. Suspendisse potenti. Nullam sit amet hendrerit ipsum. Phasellus eros odio, dictum nec enim vitae, placerat luctus erat. Nullam pretium suscipit erat non condimentum. Cras odio ligula, tincidunt ut dolor eget, convallis eleifend velit. Proin eu feugiat lacus. Aliquam convallis aliquam nulla, a finibus magna porttitor malesuada. Phasellus ultrices nunc sagittis, egestas velit a, mattis nisi. Nunc tincidunt, mauris ac tempor blandit, velit felis mollis mi, vitae molestie ante turpis quis velit.",
        ["Sport", "News", "Article", "Competition"],
        new Date('2021-02-13T03:24:00')),
    new News(
    "Tech",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis mauris et neque consectetur dictum. Mauris vestibulum quam nunc, at interdum tortor ultricies eu. Aliquam id ullamcorper mauris. Suspendisse potenti. Nullam sit amet hendrerit ipsum. Phasellus eros odio, dictum nec enim vitae, placerat luctus erat. Nullam pretium suscipit erat non condimentum. Cras odio ligula, tincidunt ut dolor eget, convallis eleifend velit. Proin eu feugiat lacus. Aliquam convallis aliquam nulla, a finibus magna porttitor malesuada. Phasellus ultrices nunc sagittis, egestas velit a, mattis nisi. Nunc tincidunt, mauris ac tempor blandit, velit felis mollis mi, vitae molestie ante turpis quis velit.",
    ["Science", "News", "Article", "Technology", "Robots"],
    new Date('2021-06-13T03:24:00'))]);
news.print();
news.remove_by_title("Sport");
news.sort_by_property("date",true);




