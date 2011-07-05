#Javascript function decorators

Function decorators are a powerful tool in Java and Python, allowing you to wrap functions around functions, providing reusable pre and post processing.

For example in Python I can set up a decorator that takes an argument with:

```python
def my_function_decorator(decorator_argument):
	@decorator
	def wrapper(_target, *args, **kwargs):
		if kwargs.get('blah') and decorator_argument:
			kwargs['blah'] = 'overridden argument'
		result = _target(*args, **kwargs)
		if result == 'monday' and decorator_argument == 'no monday':
			result = 'tuesday'
	return wrapper
```

And I wrap this around my function like this:

```python
@my_function_decorator('no monday')
@def my_function(*args, **kwargs):
	print kargs.get('blah')
	return 'monday'
```

This functionality is harder to reproduce as cleanly in javascript, I could execute:

```javascript
result = my_function_decorator(my_function(), 'no monday')
```

I'd have to run this each time and this gets tedious. It'd be nice if I could setup a function that is pre decorated!

##Enter the prototype extensions for javascript's function objects!

Using this library I could define two functions and then decorate one with the other, or even decorate an anonymous function with a decorator stored in a variable.

Take a look at this:

```javascript
function my_decorator(dArgs, arg1)
{
	if (arg1 && dArgs[0])
		arg1 = 'overridden argument';
	this.apply(this, arguments);
	if (this.ret == 'monday' and dArgs[0] == 'no monday')
		this.ret = 'tuesday'
}

var my_function = my_decorator.decorate('no monday',
	function (arg1)
	{
		console.log (arg1);
		return ('monday')
	});
```

Easy, now each call to my_function is wrapped in the decorator, and the decorator is still there to be applied to other functions.

##.decorate and .decorateWith

So we've looked at an example of how to use .decorate:

```javascript
decorator_function.decorate(arguments...., decorated_function)
```

.decorateWith is the polar oposite:

```javascript
decorated_function.decorateWith(decorator_function, arguments....)
```