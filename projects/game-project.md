---
permalink: /game-project.html
---

##### [Self Reflection](/)

[Design Diagram]: /assets/img/diagram.jpg

# Project: [Electron Sidescroller](https://github.com/wilsonjohnson/cs-499-final-game)

The game that I am creating will be a simple 2d side-scrolling game. The game is programmed in Typescript using the electron application wrapper. This will allow for a quick development cycle of a video game and engine, while sacrificing some performance. 

The game uses the PIXI.js WebGL framework to provide the most performance for rendering as is possible without the need for in-depth implementation of render pipelines.

The game also uses the JavaScript port of Box2D, planck-js. While there is a box2d.js library, it does not provide Typescript typing’s at the start of this project. The decision to utilize a pre-existing physics engine as opposed to implementing one comes purely to time constraints.

## Skills:
This artifact is intended to display proficient skills in project design as well as displaying adequate understanding of application architecture. It also showcases comprehensive understanding of Algorithms and Data Structures.

### Project Design:
Many of the considerations that are being considered for this application are indicative of a steep understanding of project design. The application has been broken down into the base goal of designing a 2d platforming videogame engine, which is outlined in the following diagram:

![Design Diagram][Design Diagram]

At this stage in development the Renderer and Physics engine are implemented, and the other systems have partial implementations that need more abstraction.

### Algorithms & Data Structures:
Many of the processes that will drive this game will require a deep understanding of asynchronous event loops and simple but effective functions for translating various game events into interactable objects.

The goal here is to create simple constructs that allow for quick passing of messages between the various systems of the game to allow for simple but effective goal management.
Other indicators of this skill are present in the integration layer between the Physics engine and the Renderer.

The physics engine utilizes meters to perform all its calculations, whereas the renderer calculates its output in pixels. To have these two communicate effectively, it was imperative to have some sort of scale that translates the objects as they are in the physics engine quickly to their counterparts in the renderer. 

The implementation of this is not fully abstracted to my personal liking, but it provides enough flexibility now to allow for more of the features to make it into the final product.

The most complicated portion that has been developed at this time is the Line class, which is utilized to create lines that both PIXI.js and planck-js can understand.
Example of Line in action:
```typescript
// physics.ts class PixiPlankCreator, method overloading removed
public createLine( start: Coordinate | Vec2 | Point, end: Coordinate | Vec2 | Point, lineStyle?: LineStyle ): PhysicsGraphics {
	// Create a new Line with the passed in coordinates
	const line = new Line( start, end );

	// Clone and scale line to the plank version
	const planckLine = line.clone().centerAtOrigin().scale( this.planckScale );

	// Create the planck Edge object using the scaled line
	let edge = new Edge( planckLine.start, planckLine.end );

	// Create the physics body
	let graphics = new PhysicsGraphics( this.scale, this.world, this.type, 'center', edge );

	// Create a centered line for rendering
	const origin = line.clone().centerAtOrigin();

	// Apply stylings for renderer
	if( lineStyle ) {
		graphics.lineStyle( 
			lineStyle.lineWidth,
			lineStyle.color,
			lineStyle.alpha,
			lineStyle.alignment
		);
	}

	// Move the graphics start point for the draw call
	graphics.moveTo( origin.start.x, origin.start.y );
	// Draw a line to the endpoint
	graphics.lineTo( origin.end.x, origin.end.y );

	// Instantiate the collision object
	graphics.setCollision();
	
	// Translate to the center
	graphics.translateTo( line.midpoint.x, line.midpoint.y );
	
	return graphics;
}
```

This is not the only ease of use integration created however, there are many more in the [PixiPlankCreator class](https://github.com/wilsonjohnson/cs-499-final-game/blob/master/src/physics.ts#L356)

### Objectives
- [x]  Physics Engine Integration
- [x]  Renderer Implementation
- [x]  Input API
- [x]  Application Runs
- [ ]  Entity manager
- [ ]  Scoring system
- [ ]  Level Manager
- [ ]  Life and Health Manager
- [ ]  Hitbox triggers


### Tools Used:
- [PIXI.js on GitHub](https://github.com/pixijs/pixi.js/)
- [plank-js](http://piqnt.com/planck.js/)
- [Electron js](https://electronjs.org/)


### Code Review
This portion does not contain a code review as this was created from the ground up, There was no code to review, however, upon full completion of all objectives, a code review shall be added.
