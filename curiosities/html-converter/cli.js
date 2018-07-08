#!/usr/bin/env node

/**
 * Excerpt from https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * @type {string}
 */
const html = `

<article id="wikiArticle">


    <div></div>

    <p><span class="seoSummary">In an <a href="/en-US/docs/Web/HTML">HTML</a> document, the <strong><code>document.createElement()</code></strong> method creates the HTML element specified by <code>tagName</code>, or an <a href="/en-US/docs/Web/API/HTMLUnknownElement" title="The HTMLUnknownElement interface represents an invalid HTML element and derives from the HTMLElement interface, but without implementing any additional properties or methods."><code>HTMLUnknownElement</code></a> if <code>tagName</code> isn't recognized.</span></p>

    <div class="note">
        <p><strong>Note</strong>: In a <a href="/en-US/docs/Mozilla/Tech/XUL">XUL</a> document, it creates the specified XUL element. In other documents, it creates an element with a <code>null</code> namespace URI.</p>
    </div>

    <h2 id="Syntax">Syntax</h2>

    <pre class="brush: js line-numbers  language-js"><code class=" language-js"><span class="token keyword">var</span> element <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="line-numbers-rows"><span></span></span></code></pre>

    <h3 id="Parameters" class="highlight-spanned"><span class="highlight-span">Parameters</span></h3>

    <dl>
        <dt><code>tagName</code></dt>
        <dd>A string that specifies the type of element to be created. The <a href="/en-US/docs/Web/API/Node/nodeName" title="The Node.nodeName read-only property returns the name of the current node as a string."><code>nodeName</code></a> of the created element is initialized with the value of <code>tagName</code>. Don't use qualified names (like "html:a") with this method. When called on an HTML document, <code>createElement()</code> converts <code>tagName</code> to lower case before creating the element. In Firefox, Opera, and Chrome, <code>createElement(null)</code> works like <code>createElement("null")</code>.</dd>
        <dt><code>options</code><span class="inlineIndicator optional optionalInline">Optional</span></dt>
        <dd>An optional <code>ElementCreationOptions</code> object containing a single property named <code>is</code>, whose value is the tag name for a custom element previously defined using <code>customElements.define()</code>. See <a href="#Web_component_example">Web component example</a> for more details.</dd>
    </dl>

    <h3 id="Return_value" class="highlight-spanned"><span class="highlight-span">Return value</span></h3>

    <p>The new <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" title="The Element interface represents an object of a Document. This interface describes methods and properties common to all kinds of elements. Specific behaviors are described in interfaces which inherit from Element but add additional functionality."><code>Element</code></a>.</p>

    <h2 id="Examples">Examples</h2>

    <h3 id="Basic_example" class="highlight-spanned"><span class="highlight-span">Basic example</span></h3>

    <p>This creates a new <code>&lt;div&gt;</code> and inserts it before the element with the ID "<code>div1</code>".</p>
    
</article>
    
`;

const codeGen = require('./lib/convert')(html);
console.log(codeGen);

require('fs').writeFileSync(require('path').join(__dirname, 'out.js'), codeGen);