# Arkade

Arkade (`ak`) is the *tacklebox* to React's *fishing pole.*

React isn't _"batteries included"_, so Arkade is a pack of shiny new _batteries_.

Arkade is a collection of smallish useful components, each designed to not get-in-the-way of how you compose your apps.


### Arkade includes...
- **`arkade/common`** Reliable common components like `<Icon>`, `<ProgressBar>`, and `<TabPanel>`.
- **`arkade/errors`** 3 custom error types for better DX
- **`arkade/forms`** A suite of form components to make input a breeze
- **`arkade/hooks`** 3 hooks: `useModel`, `useSession`, and `useStorage`.
- **`arkade/layouts`** 3 flex-based layouts: `<RowLayout>`, `<StackLayout>`, and `<CentralLayout>`
- **`arkade/media`** 2 media-related components, `<Audio>` (audio player with controls) and `<CoverVideo>` (dynamically sizes a video for use as a background)
- **`arkade/tools`** 7 components for better DX and/or which have deeper functionality (such as `<ScrollWatcher>` and `<ErrorBoundary>`).
- **`arkade/utils`** small, useful utility functions across 9 categories (browser-, download-, form-, object-, react-, social-, storage-, text-, _and_ type-utils)
- ..._and_ an optional sass-based **UI theme generated based on a color scheme you provide**, including utility classes, stylized HTML defaults, animations, and automatic flavor classes for buttons, text, borders, and backgrounds.

## Installation & setup
```
npm install arkade
```

Arkade is offered in non-transpiled, native ES6 module format, containing JSX and SCSS markup.

Being a React toolkit, Arkade requires a sibling dependency `react` of at least version 16.0.

To use the icons, you'll need to make sure FontAwesome CSS is included in your app bundle (or better yet, loaded on the page via a CDN).

Arkade also includes SASS, which should be transpiled to CSS at some point by your application (usually during your build step).

## Crash course
Here are some example of how Arkade can get things done. Try them out!

### Simple show/hide modal toggle (persists to session!)

```js
import React from 'react'

import { useSession } from 'arkade/hooks'
import { ModalWrapper, ModalBody } from 'arkade/tools'

export const MyModalTrigger = () => {
	const [isModalShown, setIsModalShown] = useSession('myModalVisibility', false);
	
	const showModal = () => setIsModalShown(true)
	const hideModal = () => setIsModalShown(false)

	return (
		<section>
			<button className="btn btn-primary" onClick={showModal}>
				Open modal
			</button>
		
			<ModalWrapper visible={isModalShown}>
				<ModalBody onClose={hideModal}>
					Modal Content Baby
				</ModalBody>
			</ModalWrapper>
		</section>
	)
}

```

### A sleek background video header

```js
import React from 'react';

import { Icon } from 'arkade/common';
import { CoverVideo } from 'arkade/media';
import { CentralLayout } from 'arkade/layouts';

export const MyComponent = ({ someProp }) => {
    const videoSources = [
        { src: '/assets/splash-video.mp4', type: 'video/mp4' },
        { src: '/assets/splash-video.ogv', type: 'video/ogg' },
        { src: '/assets/splash-video.webm', type: 'video/webm' }
    ];

    return (
        <CoverVideo sources={videoSources} aspectRatio={1.66}>
            <Icon fa="plane" style={{ fontSize: '3em' }} />
            <h1>Plan your dream vacation.</h1>
            <button>Let’s Go!</button>
        </Cover>
    );
}
```

### A simple form with validation

```js
import React, { useState } from 'react';

import { Fieldset } from 'arkade/forms';
import { AppError, ValidationError } from 'arkade/errors';
import { isNonEmptyString } from 'arkade/utils/type-utils';

const isValidMessage = (givenMessage, formModel) => {
	if (!isNonEmptyString(givenMessage) || givenMessage.length < 10)
		throw new ValidationError('Message must a string at least 10 characters long.', givenMessage);
	if (givenMessage.toLowerCase().contains('dallas cowboys'))
		throw new ValidationError('This is an eagles town.', givenMessage);
	if (formModel.email.toLowerCase() === 'peeves@hogwarts.edu')
		throw new ValidationError(`We don't wanna hear it, Peeves.`, givenMessage);
		
	return true;
}

const isValidEmail = (email) => {
	const EMAIL_PATTERN = /^[^\s@]*@[^\s_@]+[\s]*\.[a-zA-Z]{2,}$/;
	
	if (!isNonEmptyString(givenMessage) || !EMAIL_PATTERN.test(email))
		throw new ValidationError('Please enter a valid email.', email);
		
	return true;
}

export const MyComponent = ({ someProp }) => {
	const [model, setModel] = useState({ message: null, email: null });
	
	const fields = [
		{
			modelKey: 'message',
			label: 'Your Message',
			icon: 'pencil',
			type: 'text',
			validate: isValidMessage
		},
		{
			modelKey: 'email',
			label: 'Your Email',
			type: 'email',
			icon: 'envelope',
			validate: isValidEmail
		}
	];
	
	
	return (
		<CentralLayout>
			<Fieldset
				fields={fields}
				model={model}
				onModelChange={setModel}
			/>
		</CentralLayout>
	);
}


```

# What's In The Box

## Components

### from `arkade/common`

- `<ProgressBar />`
- `<Icon />`
- `<FontAwesomeIcon />`
- `<ImageIcon />`

### from `arkade/media`

- `<Audio />`
- `<CoverVideo />`

### from `arkade/tools`

- `<ModalBody />`
- `<ModalWrapper />`
- `<ErrorBoundary />`
- `<Inspector />`
- `<Portal />`
- `<Specimen />`

---

## Errors
Custom error types for better DX

### `new AppError(message, contextData, ...rest)`
- Attaches `.contextData` to resulting error


### `new NetworkError(statusCode, message, ...rest)`
- Attaches `.statusCode` to resulting error
- Adds `.contextData` string combining message and statusCode

### `new ValidationError(message, invalidGivenValue, ...rest)`
- Attaches `.invalidGivenValue` to resulting error
- Adds `.contextData` string combining message with value



## Utils
A few sets of utilities

### Exported from `arkade/utils/type-utils`
- `isDefined (value)`
- `isString (value)`
- `isNonEmptyString (value)`
- `isFunction (value)`
- `isArray (value)`
- `isNonEmptyArray (value)`
- `isNumber (value)`
- `isNumberList (value)`
- `isNaN (value)`
- `isNull (value)`
- `isRegex (value)`
- `isBoolean (value)`
- `isObject (value)`
- `isPrimitive (value)`

### Exported from `arkade/utils/text-utils`
- `reindent (text)`
- `trim (value)`
- `splitByFirst (value, splitByChar = '')`
- `splitBy (value, splitByChar = '')`
- `prettyPrint (content, singleLine = false)`
- `lcFirst (text)`
- `ucFirst (text)`
- `forceCamelCase (value)`
- `forceSnakeCase (value)`
- `cleanTagList (tagList)`
- `stripHtmlTags (html, allowTags = [], keepAttributes = false)`

### Exported from `arkade/utils/object-utils`
- `getDeep (object, path, pathSeparator = '.')`
- `setDeep (object, path, replacement, pathSeparator = '.')`
- `anonymizeObject(data, fields, preserveFields)`
- `sortBy (list, accessor)`
- `sortObjectKeys (obj)`
- `sortObjectArrayValues (obj, sortAccessor)`
- `memoize (func, resolver = null)`
- `pick (obj = {}, keys = [])`
- `getKeys (object)`
- `clone (object)`
- `mergeDeep (...objects)`
- `equals (a, b)`
- `unique (array)`
