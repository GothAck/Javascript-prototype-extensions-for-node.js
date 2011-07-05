Function.prototype.decorate = function ()
{
  var arguments = Array.prototype.slice.call(arguments);
  var decorator = arguments.shift();
  var decorated = this;
  var ret;
  var decoratedWrapper = function ()
  {
    arguments = Array.prototype.slice.call(arguments)
    arguments.shift();
    this.ret = decorated.apply(decorator, arguments);
    ret = this.ret;
    return this;
  }
  var decoratorWrapper = function ()
  {
    decorator.bind(decoratedWrapper).apply(this, arguments);
    return decoratedWrapper.ret;
  }
  decoratedWrapper.decorator = decorator;
  decoratedWrapper.decorated = decorated;
  decoratorWrapper.decorator = decorator;
  decoratorWrapper.decorated = decorated;
  return decoratorWrapper.bind(decorator, arguments);
}
