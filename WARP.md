# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

This is a vanilla js, css and html project. We use Dataroom Components for custom html components -- please see the @prompts/dataroom-manual.md for more information. Please use dataroom.js features as detailed in this document as much as possible.

We do not use shadow dom. We do not embed CSS in Javascript -- we create a new .css file in the @styles folder and import it in @index.css. 

all Js files are imported in @index.js. The entry point to our app is index.html.

do not run or start a dev server -- that is already running

Use standard components as much as possible. Please do not style anything -- I will style it manually.
