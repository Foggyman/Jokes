# Jokes

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080, api: chuck norris
npm run dev

# serve with hot reload at localhost:8080, api: yo momma
npm run dev:yomomma

# build for production with minification, api: chuck norris
npm run build

# build for production with minification, api: yo momma
npm run build:yomomma

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test

# run e2e tests with jest and puppeteer (to do in another shell while running the build with serve)
npm run test:e2e

# Starts Storybook in development mode
npm run storybook

```




#What is this
This is a project I developed for a test of a work application. I add here both the
text of the test and the steps of my work and some thoughts during it.


#The Test

The purpose of this test is not only to quickly gauge an applicant's abilities with a simple HTML/CSS mockup, but also their approach to development. It is intended to spend 2-4 hours on the test.

Applicants may use whatever techniques, frameworks, libs and technology they want to achieve the outcome.

The design should be very rudimentary or standard, but a beautiful result will be appreciated.

How to complete the task
Complete the project and send back the URL of your own public Git repository. Add some notes about the techniques, frameworks, libs and technology choosen.

If you are not comfortable with using Git, you can send a ZIP file containing all the sources.

Show your working
If you choose to use build tools to compile your CSS and Javascript, please ensure to include all the runnable build procedure as well.

Cross-browser inconsistencies
If you get around to doing cross-browser testing, for the sake of this project the most up-to-date versions of Chrome, Firefox and Safari will suffice. Include details in the README file/email of what cross-browser testing you have been able to do.

Responsive Design
For extra credit, ensure that the site scales well on mobile.

Clean code
This fictitious project is part of a larger plan to reuse templates for multiple properties. When authoring your CSS ensure that it is easy for another developer to find and change things such as fonts and colours.


###The Test
Create a simple page called JOKES to display data available at https://api.chucknorris.io/jokes/search?query=[QUERY] (API specs can be found at https://api.chucknorris.io). When a user access the website a simple Google-like home page is shown with a big search box in the middle. Under the search box a new random JOKE is shown every 3 seconds (API for random JOKE https://api.chucknorris.io/jokes/random).
By typing one or more term in the searchbox a list of matching JOKES are displayed in the page.


###Some Extras
Feel free to add as many improvements you want in the project, both in the source or on the final page/application.

####Extra credits on code:
- Simplicity, scalability
- Linter
- Usage of a template engine
- Reusable components
- Storybook components
- E2E automated tests
- Edge Deploy
- Configurable API endpoint and configurable entity processor (some other public APIs can be found here https://github.com/public-apis/public-apis)
- Jamstack approach with static and dynamic version of the result view
- ...Many more


####Extra credits on frontend:
- Speed, performance, speed, speed
- Effects and animation for random JOKE
- Results displayed in a responsive grid
- Direct search while typing
- Query highlights
- Pagination, infinite scroll
- Display of total results
- Debug backdoor
- Category filter with facets in the category selector
- ...Many more


Good luck!
We look forward to seeing what you can do. Remember, although it is a test, there are no specific right or wrong answers that we are looking for - just do the job as best you can. Feel free to ask for any doubts or questions to sandro.bottoni@24orebs.com.

#My toughts during the work

###The first evening/night
While doing this test I want to take the opportunity to try some new stuff, in particular I want to try PReact as i know React very well and I only read about PReact, without truly trying it . (And I know that the company I am doing this test for use React in its stack)
PReact should fit very well the request of a fast/lightweight library to run a search page. Also I am interested in trying the out of the box static prerender the PReact CLI offers, with a sort of frontend only "hydration".

So I install PReact CLI and chose the default project boilerplate; before start coding I do some checks around the boilerplate:
- service worker is already configured on css and js
- the prerender on build seams to work, i see the static html in the build folder if I launch the build, that's cute
- code splitting is already configured to divide in chunks for every "route" component (automated on the route folder) this is nice too
- the PWA manifest is already done
- for some reason jest fails trying to test the component already in the boilerplate
- there are no SASS nor LESS nor styled comp

OK I start installing sass and sass-loader (hm i need to use sass-loader 10 because of current version of webpack).

Then I work on fixing jest... ok it is just a file match problem, I change the configuration to have unit test in the same component folder like i am used to while I am working on jest I install and configure puppeter, for e2e testing.. I don't know if i will have time to create a complete e2e test but at least I can prepare it.

Ok puppeteer+jest is working, now I should start coding but, before, I import an eslintrc form another project i worked and.. first thing i don't really like in PReact: I took some time but I was not able to configure eslint to consider React as variable to include in jsx files (Preact have "h"). The better way I found is to pass the jsx pragma to eslint via comment at the beggining of the file.

Ok now some coding... mm actually maybe is better to think if I need/want a state manager. The answer is yes: I want it even if maybe I don't need it. For the same reason I have chosen PReact and not React, I don't want to user redux.. i decided to try redux zero after some search in google, I wanted something light and fast and redux zero seems to fit.

Ok i start with the net / api code, I use simple fetch and nothing more, but I spice a little the things up using multiple preact conf file to change the npm build/dev command to build the app for diffent api:

1) I could have used different routes with different props to achieve it at run time and not build time but I wanted to mess around with PReact configurations

2) I lose quite some time playing with preact configuration and env variable

3) I decided after some search to use YoMomma as second api but later I will discover it has a limit of 5 calls per minute (but I don't have time / want to search another that fit )

I put also the response processors in separate files and that part is ready, I already create the actions and the store with redux zero, that is quite fast I have to say but it feels maybe too less structured.

I insert some utility for debug, more or less copying it from another project I worked on.

I start with a component, first with the "random joke", to be a little faster and light I don't separate hight order component from the pure UI. As the unit test of high order component together with the UI seems not working with Ezyme (I tried a bit) I dedide to export also the internal component to simplify the unit test and in future I could use it for a storyboard.

Now that the component is in the route page (home) I need a css grid system... this time I opt for flexbox grid as it has some nice thing and it is just a grid without other css library stuff I don't need. Then I add some css animation to the joke... ok nice done with it.

It starts to be late at night, so I try to speed up: I create the search and decided to copy its css from Google (I mean... they are good with searches no?) I implement the "search while typing" with a debounce utility function that I add to the project. I implement also the abort fetch to be sure to not have strange behavior in case of not sequential responses of multiple api calls.
(it is not supported on IE but i "gracefully" polyfill it with an empty stub).

I finish the unit test of this part too (Jest is so nice i can speed up the time in the tests, I want it also for the real life), now is starting to be very, very late but I want a nice animation for the results... I decided to try it myself without another library as we said we want all to be light... ok the final result is not as fluid as i wanted and probably the code should be cleaned but at least seams to work well on mobile too.

I decided to come back tomorrow to finish it.

###The second night
This evening... well night I started quite later, but I want to finish it in 2 evening max, I decided to go superfast:
the results component should be split in 2 or 3 other components before doing proper unit test... I want to finish the project so I just add the highlight of the search results (and also it is not well done at all as it should highlight all the occurrences of the word searched not only the first in every joke... well maybe later).

Ok now time to add storybook to the project, it actually does not have much sense in this project: I usually use storybook in multipackage monorepo project (APP  and UI) and here the ui is even not split well from the logic.. I do it just because it is mentioned in the test: I create 4 stories with some controls, the animation of the search result kinda work in storybook too and you can edit the input array to trigger it
...that worked out nicer then I taught.
Configuring sass on storybook took a little because of the css loader module configuration that was not well documented at all and so I decided to call the test done...

##Those things could/should have been added:

- Husky
- Category filter on search
- Results components split with unit testing
- Actions unit testing
- Write more test in the jest+puppeteer e2e test


###Thoughts about PReact and Redux Zero:
Writing in PReact seems identical to write in React, yes some stuffs are missing (PropTypes) but usually seams you can add it back if you want, and the kilobyte save is important. Also i really liked the static prerender on the fe.
Redux zero on the other end did not conviced me 100%.. yes it is faster then using the sagas for example but.. it fells too much clutterd, mybe I am just a reducer guy, it is taste.



