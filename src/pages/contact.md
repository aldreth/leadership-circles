---
title: Contact
permalink: /contact/index.html
description: 'Eleventy Excellent is inspired bythe companion website of Andy Bell’s talk "Be the browser’s mentor, not its micromanager".'
layout: page
---

Send us a message:

<!-- /TODO: add action="/pages/success" to go to a custom page after message submission -->
<form name="contact" method="POST" data-netlify="true">
    <label for="name">Name: </label> 
    <input type="text" name="name" />
    <label for="email">Email: </label>
    <input type="email" name="email" />
    <label for="message">Message: </label>
    <textarea name="message"></textarea>
    <button class="button" type="submit">Send</button>
</form>
