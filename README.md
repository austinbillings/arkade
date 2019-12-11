# Arkade


## Installation / setup
Arkade assumes you're writing ES6 code in the ES6-module style. No transpilation compilation of the source code is necessary.

Arkade requires a sibling dependency `react` of at least version 16.0.

```sh
> npm install arkade
```

In your project:

```js
import React from 'react';

import { Icon } from 'arkade/components/common';
import { CoverVideo } from 'arkade/components/media';

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

# What's In The Box
(Documentation coming soon, I hope)

## Components

### from `arkade/components/common`

- `<ProgressBar />`
- `<Icon />`
- `<FontAwesomeIcon />`
- `<ImageIcon />`

### from `arkade/components/media`

- `<Audio />`
- `<CoverVideo />`

### from `arkade/components/tools`

- `<ModalBody />`
- `<ModalWrapper />`
- `<ErrorBoundary />`
- `<Inspector />`
- `<Portal />`
- `<Specimen />`

---

## Errors
Custom error types

- `AppError`
> A generic error type, which accepts an error message AND arbitrary contextual data you can extract and use later in your execution. Effectively allows you to tie-in any necessary metadata when you throw an error.

 > ```
 function myAsyncFunc() {
   if (!someService.started) throw new AppError('Some service failed to start', { serviceId, requestContext })
   ...
}
/*
... later on ...
*/
myAsyncFunc()
    .then(handleResponse)
    .catch(err => log('Service failed to start, heres the request context:', err.contextData.requestContext));
```

---

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
