# Focus Manager

Manage browser focus using a simple API.

__Current Version__: 1.0.0

__Focus Manager__ allows you to manage browser focus via an easy to use Javascript API. It's features include:

1. Store a DOM element to eventually return focus to
2. Send focus to any DOM element
3. Restore focus to a previously stored DOM element


## Quickstart

Install `focusManager` using bower (WIP)

Initialize in your view:

```
focusManager.init();
```


### Store a DOM element

When you want to record an element for future focus restoration, store that element and give it a contextual label.

```js
$('#openModal').click(function() {
    focusManager.store($(this), 'myModalButton');
});
```


### Send Focus to anything

Even if an element is normally not focusable (i.e. a `div`), you can send focus to it using `focusManager`. A `tabindex` will be added if one is missing to ensure focus is possible.

```js
$('#openModal').click(function() {
    focusManager.store($(this), 'myModalButton');
    // open and reveal the modal
    focusManager.send('#myModal');
});
```


### Restore Focus

When you want to return to a previously focused element, restore its focus using the same label you provided when it was stored.

```js
$('#closeModal').click(function() {
    focusManager.restore('myModalButton');
});
```


## Methods

### `store()`

Stores a DOM element in memory for future focus restoration.

| Parameter name | Description |
|----------------|-------------|
| **$element** | The DOM element you want to store for future focus restoration |
| **context** | The contextual label used to reference and restore the stored element |


### `send()`

Sends focus to any DOM element. A `tabindex` will be added to the target DOM element if one isn't already present.

| Parameter name | Description |
|----------------|-------------|
| **$element** | The DOM element you want to send the browser focus to |


### `restore()`

Restores focus to a DOM element in memory, referenced by the provided context.

| Parameter name | Description |
|----------------|-------------|
| **context** | The context label used to reference the memory that is storing a DOM element |


### `reset()`

Resets the `FocusManager`'s memory to it's initial default state (an empty array).


### `getStack()`

Returns the memory stack as an array. This array is not the memory itself, as such changes to this array does not effect the actual memory. It is only meant to be used as a means of reference.


## Grunt Tasks

* `grunt` or `grunt build` - builds a distributable release
* `grunt test` - runs the test suite
* `grunt test:browser` - runs a server that allows you to run the test suite in your browser
