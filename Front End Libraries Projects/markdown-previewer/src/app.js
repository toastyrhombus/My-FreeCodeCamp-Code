import React from "react";
import "./app.css";
import logo from "./img/square-2673252_640.png";
import marked from "marked";
import githubMark from "./img/GitHub-Mark-64px.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };

    this.updateParent = this.updateParent.bind(this);
  }

  updateParent(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div id="App" className="container-fluid min-vh-100">
        <div id="wrapper min-vh-100" className="row">
          <Header />
          <TextArea updateParent={this.updateParent} />
          <PreviewArea html={this.state.input} />
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div id="header-wrapper" className="col-lg-12">
      <header className="w-100 h-100 d-flex justify-content-center align-items-center pt-3 pl-2">
        <a
          href="https://www.freecodecamp.org/fcc6d127099-e96b-41d1-978f-359316c20bf3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logo}
            alt="Rhombus Logo"
            height="64"
            className="img-blend"
          ></img>
        </a>
        <h1 className="m-auto">Markdown Previewer</h1>
        <a
          href="https://github.com/toastyrhombus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={githubMark}
            alt="Github Logo"
            height="64"
            className="ml-auto animation-rotate"
          ></img>
        </a>
      </header>
    </div>
  );
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleParentChange = props.updateParent;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ input: initialMarkdown });
    this.handleChange({ target: { value: initialMarkdown } });
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
    this.handleParentChange(e);
  }

  render() {
    return (
      <section id="text-area" className="text-area col-lg-6 py-3">
        <textarea
          id="text-area-widget"
          className="no-resize h-100 w-100 widget"
          onChange={this.handleChange}
          value={this.state.input}
        />
      </section>
    );
  }
}

class PreviewArea extends React.Component {
  render() {
    return (
      <section id="preview-area" className="preview-area col-lg-6 py-3">
        <div
          id="preview-area-widget"
          className="no-resize h-100 w-100 widget p-3 overflow-auto"
          dangerouslySetInnerHTML={{ __html: marked(this.props.html) }}
        />
      </section>
    );
  }
}

export default App;

const initialMarkdown = `# Welcome!

This is a basic markdown previewer running the JS library [marked](https://github.com/markedjs/marked) on top of [ReactJS](https://reactjs.org). This page also uses [Bootstrap](https://getbootstrap.com) for layout and basic styling. This webapp was built as a reply to the 'Build a Markdown Previewer'  challenge on [FreeCodeCamp](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer).

### GFM - Github Flavoured Markdown
Marked is a compatible Github Flavour Markdown module. Which means that any markdown previewed here and subsequently moved to github should be reflected accurately.

##### Index
[Headings](#headings)  
[Emphasis](#emphasis)  
[Lists](#lists)  
[Line Breaks](#linebreaks)  
[Links](#links)  
[Code](#code)  
[Images](#images)  

<a name="headings"></a>
## Headings
---
Headings are pretty cool big words you can throw in your markdown! For those people who love to structure things using headings, or just those that like to type in large bold characters!
\`\`\`
#      H1  
##     H2  
###    H3
####   H4
#####  H5
###### H6
\`\`\`
#      H1  
##     H2  
###    H3
####   H4
#####  H5
###### H6 \`Is the smallest\`

<a name="emphasis"></a>
## Emphasis
---
\`\`\`
_italicize_
*italicize*
__boldinize__
**boldinize**
___bothinize___
***bothinize***
\`\`\`

You can emphasize text by wrapping your words in either *asterisks* (\`**\`!!Stars!!\`**\`) or _underscores_. Using two underscores or asterisks will make the **text** __bold__! ***OR*** you can use ___three___ together to make the text both **bold** and *italic* at the same time!

<a name="lists"></a>
## Lists
---
1. A numbered list can be created by created by
1. using any number followed by a fullstop and a space
22122. It doesn't matter what number you use, so long as it's a number.  
\`1. This is the start of a numbered list\`  
Bulleted lists can be created by using a - followed by a space
- This is a bulleted list
- More bullet lists!
 - You can also nest lists with a space before and after the dash  
You can also nest blocks of text on the same indentation as the sub list by just typing it on the next line.

\`- Bulleted list\`  
\` - Sub list\`

<a name="linebreaks"></a>
## Line Breaks
---
You can enter new paragraphs by placing a blank line between two blocks of text.

Like so. This is another paragraph, **hooray** for paragraphs!

You can also put a line break in by double spacing at the end of a line.  
This will place a line break in but will not move the new line down as far as a new paragraph. This giving you a way to organize your text as well as you organize your star wars figures in chronological order from good to bad.

**ALSO** you should know that you can create a \`<hr>\` tag by putting three dashes \`---\` on a new line. Try it out!

## Links
---
Place links in your markdown using the following syntax:  
\`[Your super awesome link](http://somewhereawesome.com)\`

Just like so:
[Somewhere super awesome!](https://www.youtube.com/watch?v=oHg5SJYRHA0)

## Code
---

To write code without having it being interpreted as markdown, you can surround inline text with a single *back-tick*: \`\`\` \`This is _some_ code\` \`\`\`.

You can also create code blocks by using multiple back-ticks to wrap multiple lines of text where you can write anything your tender heart desires:-
\`\`\`\`\`\`
#### Awesome
### Sauce
\` Code here too \`
*Blarg*
\`\`\`\`\`\`

<a name="images"></a>
## Images
---
Images can be embedded by using the link syntax **but** you need to place an exclamation mark in front of the text portion of the link. 

![Pirate Cat](https://i.chzbgr.com/full/2202934016/h0B04BB0F/yar-i-be-a-pirate)

Like so:  
\`![Some fantastic picture](http://somethingfancy.com/superawesomepiccy.png)\`
`;
