/***** Modified: 
 * https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server 
 **/

// Cheating lol !
class TextFile{
    constructor(filename){
        this.filename = filename;
        this.size = 0;
        this.a = document.createElement('a'); // Cheating lol !
        this.a.setAttribute('href',  'data:text/plain;charset=utf-8,');
        this.a.setAttribute('class',  'instaspect__download');
        document.body.appendChild(this.a);
        this.a.style.display = 'none';
    }

    append(text){
        setTimeout(() => {this.a.href +=  encodeURIComponent(text +'\r\n');}, 100);
        this.size += text.length;
    }

    download(){
        this.a.setAttribute('download', this.filename);
        this.a.click();
        document.body.removeChild(this.a);
    }
}

export {TextFile};