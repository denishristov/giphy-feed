# GIPHY Infinite Search Feed

![giphy-feed](https://user-images.githubusercontent.com/22468578/71495119-e30f0e00-2854-11ea-85cb-b620d344460e.gif)

Live at: https://giphy-feed.herokuapp.com/

## How to run

1. Install `node` and `yarn`
2. Create a `.env` file with the following content in the root of the project:

```
REACT_APP_GIPHY_API_KEY=<your_api_key>
```

3. Run `yarn`
4. Run `yarn start`

## How to test

1. Run `yarn test .`

### Stats

- 37 tests
- 98% coverage (excluding `index.tsx`, `src/config`, `src/api`)

<img width="1173" alt="Screenshot 2019-12-24 at 15 49 05" src="https://user-images.githubusercontent.com/22468578/71415571-01aeb280-2665-11ea-8327-8221f62a12f0.png">

## Challenges and what I focused on solving (in no order)

### Code quality, maintainability, and testability

Although having a robust code structure for such a small project might be considered "overengineering" I decided to include TypeScript as the language of choice. I believe no scalable web app is maintainable without TS and the received benefits, especially in the long term, are worth investing in. I have also spent a little more time decoupling my modules so they are easier to read, maintain and test.

### Performance

Having a performant app is virtually always a real requirement. The biggest bottleneck in this project was the size of the images themselves as they can reach up to several MBs. The mp4 format helps reduce the overhead but I did several things that I believe trick the user into thinking that the app works "faster":

1. Fetching the smallest with the lowest quality image first: rendering a low-quality placeholder provides the ability to preview the image instead of only waiting for the big blobs to be fetched.
2. Windowing: here it is primarily used to render only what needs to visible which furthermore decreases the number of requests made. It does improve performance if the feed gets too big but I would not say that this is that big of an issue for this project. It also introduces a big downside - all layout is computed with JS which is a generally worse alternative and introduces complications.

I have also tried to keep the bundle size to a minimum by not introducing too many and too big dependencies.

Here are some benchmarks to back up some of this theory (tested on a MacBook Pro (Retina, 15-inch, Mid 2015)):

#### Lighthouse Audit:

<img width="400" alt="audit-bench" src="https://user-images.githubusercontent.com/22468578/71330507-26f0d300-2536-11ea-8619-d14e66341603.png">

#### Chrome performance profile (when scrolling and performing a search):

<img width="1528" alt="performance-bench" src="https://user-images.githubusercontent.com/22468578/71330506-26f0d300-2536-11ea-88f3-e4268df0fac2.png">

#### Average FPS: 53-57 (when scrolling).

### Responsiveness

The app has been made with both mobile and desktop devices in mind. Both the grid view and list view respect the viewport's width. The grid view dynamically collapses columns if is unable to display all of them.

<img width="1792" alt="large" src="https://user-images.githubusercontent.com/22468578/71330725-37ee1400-2537-11ea-8d40-518bf548556a.png">
<img width="1182" alt="medium" src="https://user-images.githubusercontent.com/22468578/71330726-37ee1400-2537-11ea-9129-84aaf00929dd.png">
<img width="238" alt="small" src="https://user-images.githubusercontent.com/22468578/71330727-3886aa80-2537-11ea-8aa7-0005d682ba44.png">

### Easy configuration

All modules have been written with the mindset that every constant configuration is changeable.

## Explaining some decisions

### mp4 over gif and webp

After experimenting with all 3 I found out that:

1. webps were generally smaller in size compared to gifs (up to 4.2 times)
2. mp4 were generally smaller in size compared to webps (up to 2.2 times)

Here are some netwrok inspections with 8 images (same images in different formats):

#### 8 gifs - 31.8 MB

<img width="890" alt="8 gifs sizes" src="https://user-images.githubusercontent.com/22468578/71358599-300f8d80-2592-11ea-90bf-63895ff2329e.png">

#### 8 webps - 7.8 MB

<img width="890" alt="8 webps sizes" src="https://user-images.githubusercontent.com/22468578/71358602-300f8d80-2592-11ea-9e0e-e7522531bdc3.png">

#### 8 mp4s - 3.5 MB

<img width="886" alt="8 mp4s sizes" src="https://user-images.githubusercontent.com/22468578/71358600-300f8d80-2592-11ea-91ad-dc89398f8200.png">

The downside of using mp4 is iPhones in "Low Power Mode" do not autoplay videos, but I decided to live with that.

### React

React is the perfect framework for such a small project because:

- has amazing native TS support
- comes with only basic functionality out of the box
- has (one of if not) the largest community behind it (as of today)
- I have the most experience with it
- supports hooks which are great for 2 things: reducing boilerplate and composing/reusing state modules

### Cutting off gifs in Grid view

Looking at this requirement I saw 3 potential solutions:

- current one with cut off gifs so they fill up the square
- fitting gifs in squares
- using a masonry

If I were to realize the masonry solution I would have used `react-virtualized`, but I decided to go with the first approach because I would have increased the bundle size with at least 35 KB (zipped) and introduced even more complexity into the solution.

## Future improvement

- add more tests for edge cases like respecting total count and scrolling to the top after search
- extract CSS constants in a separate file
- use masonry for the grid view because it looks fancier and deserves the engineering overhead IMO
- add metrics to measure API latency, popular searches and user interactions with gifs
- use GIPHY autocomplete and trending API's to provide a better search experience
- have a designer design a better UI
