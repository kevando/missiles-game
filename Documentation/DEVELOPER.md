https://github.com/jasonmerino/react-native-simple-store

https://github.com/facebook/react-native-fbsdk

http://stackoverflow.com/questions/38175086/facebook-login-in-react-native-firebase-3-1

http://stackoverflow.com/questions/38448800/this-operation-is-not-supported-in-the-environment-this-application-is-running-o/38471878#38471878

https://developers.facebook.com/apps/696898230474080/fb-login/

https://github.com/erikras/react-redux-universal-hot-example/issues/252



## React-Native Component Life Cycle 

##### Mounting Order
1. constructor()
2. componentWillMount()
3. render()
4. componentDidMount()

##### Updating Order
1. componentWillReceiveProps()
2. shouldComponentUpdate()
3. componentWillUpdate()
4. render()
5. componentDidUpdate()



##### constructor(props)
The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

The constructor is the right place to initialize state. If you don't initialize state and you don't bind methods, you don't need to implement a constructor for your React component.

It's okay to initialize state based on props if you know what you're doing. Here's an example of a valid React.Component subclass constructor:

constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}  
Beware of this pattern, as it effectively "forks" the props and can lead to bugs. Instead of syncing props to state, you often want to lift the state up.

If you "fork" props by using them for state, you might also want to implement componentWillReceiveProps(nextProps) to keep the state up-to-date with them. But lifting state up is often easier and less bug-prone.

##### componentWillMount()
componentWillMount()
componentWillMount() is invoked immediately before mounting occurs. It is called before render(), therefore setting state in this method will not trigger a re-rendering. Avoid introducing any side-effects or subscriptions in this method.

This is the only lifecycle hook called on server rendering. Generally, we recommend using the constructor() instead.

##### componentDidMount()
componentDidMount()
componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

##### componentWillReceiveProps()
componentWillReceiveProps(nextProps)
componentWillReceiveProps() is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare this.props and nextProps and perform state transitions using this.setState() in this method.

Note that React may call this method even if the props have not changed, so make sure to compare the current and next values if you only want to handle changes. This may occur when the parent component causes your component to re-render.

componentWillReceiveProps() is not invoked if you just call this.setState()

##### shouldComponentUpdate()
shouldComponentUpdate(nextProps, nextState)
Use shouldComponentUpdate() to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true This method is not called for the initial render or when forceUpdate() is used.

Returning false does not prevent child components from re-rendering when their state changes.

Currently, if shouldComponentUpdate() returns false, then componentWillUpdate(), render(), and componentDidUpdate() will not be invoked. Note that in the future React may treat shouldComponentUpdate() as a hint rather than a strict directive, and returning false may still result in a re-rendering of the component.

If you determine a specific component is slow after profiling, you may change it to inherit from React.PureComponent which implements shouldComponentUpdate() with a shallow prop and state comparison. If you are confident you want to write it by hand, you may compare this.props with nextProps and this.state with nextState and return false to tell React the update can be skipped.

##### componentWillUpdate()
componentWillUpdate(nextProps, nextState)
componentWillUpdate() is invoked immediately before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call this.setState() here. If you need to update state in response to a prop change, use componentWillReceiveProps() instead.

Note
componentWillUpdate() will not be invoked if shouldComponentUpdate() returns false.
componentDidUpdate()
componentDidUpdate(prevProps, prevState)
componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

Note
##### componentDidUpdate() 
will not be invoked if shouldComponentUpdate() returns false.
componentWillUnmount()
componentWillUnmount()
componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any DOM elements that were created in componentDidMount

