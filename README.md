# pico8Grunt
A build system for pico 8 using GruntJS

# What is pico8Grunt?
pico8Grunt is a very simple build system utilizing grunt to make writing code for pico8 a bit easier. pico8Grunt will watch all .lua files in the src/ directory, concatenate them into one file, and then regex the contents of this concatenated file back into the cart. This allows for multiple .lua files to be used with a single cart, and watching for file changes.

# How do I used pico8Grunt?
 **Steps:**

1. Install [Nodejs, NPM](https://nodejs.org/en/download/package-manager/), with the alternative of using [NVM](https://github.com/creationix/nvm) for an easier/better way to install

2. Install [grunt-cli](http://gruntjs.com/getting-started)

3. Download, or `git clone` this project.

4. Run `npm install` inside of the project

5. Copy the contents of your pico 8 cart (****.p8) into the file cart.p8, and place at the root of the project

6. Take the lua code in your cart, and divide it up into as many .lua files as you would like under the src/ directory

7. run `grunt` to build the code into the cart, or use `grunt watch` to watch the .lua files and automatically build them

8. Within pico8, navigate to the project, and run `load cart.p8`, and then enter `run`, and the cart should work great!
