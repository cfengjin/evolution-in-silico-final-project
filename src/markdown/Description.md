---
title: Description
---
## Description
Hello, this is my final project for CMPLXSYS 425: Evolution *in silico*. The code can be found [here.](https://github.com/cfengjin/evolution-in-silico-final-project)

This is supposed to be interactive evolver of generative pixel art using genetic programming; however, I've encountered some nasty bugs and am still trying to find fixes.

There is much existing work on this topic, a lot of them listed in the "External Links" section of [this Wikipedia article](https://en.wikipedia.org/wiki/Evolutionary_art) on evolutionary art.

What's supposed to happen is that a population of paintings are generated that fill the screen, each with its own genotype. The genotype takes in the x coordinate, y coordinate, and specified color and returns a value (mod 256) for each RGBA value of each pixel. There is a upsampling rate so we can see larger pixels!

Users can then continuously select their favorite images by clicking on them. On each click, a new population containing the selected image and its mutations will be available for selection. Over time, each generation should produce populations that are more desirable to the user's eye. Eventually, the user can save their favorite painting and call it their own!

The largest challenges were porting the Python code from our genetic programming worksheet to Javascript. Internally, Python and Javascript handle a lot of things differently, so there was much trouble reorganizing the code into paradigms that worked.

Before, I designed to use one genotype per painting so there could be some consistency across each painting, but I later realized that by having the same genotype take in different cartesian coordinates, the painting would be inclined to have some sort of gradient from (0, 0) to (width, height). It also became to difficult to get variation in color since it was the same genotype being evaluated for each RGBA channel.

Currently, this project isn't working as desired. For some reason, I can't stop React.js from regenerating new populations of paintings instead using mutated selected paintings from previous generations. Also as mentioned above, the representation of each digital painting has flaws which make it difficult to produce paintings of varied patterns and colorful contrast.

Feel free to take a look at my code and give suggestions! This is actually fun project that I'd like to continue working on.