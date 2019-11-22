<div style="width:100%">
<div style="width:100%">
	<div style="width:50%; display:inline-block">
		<p align="center">
		<img style="text-align:center" width="180" height="180" alt="" src="https://raw.githubusercontent.com/cometchat-pro/ios-swift-chat-app/master/Screenshots/CometChat%20Logo.png">	
		</p>	
	</div>	
</div>
</br>
</br>
</div>

CometChat Pro enables you to add voice, video & text chat for your website & app.

<a href="https://www.npmjs.com">[![Platform](https://img.shields.io/badge/Platform-Javascript-blue.svg)](#)</a>
<a href="https://www.npmjs.com">[![Platform](https://img.shields.io/badge/Platform-NPM-orange.svg)](#)</a>

# Quick Start

This guide demonstrates how to add chat to a Javascript application using CometChat. Before you begin, we strongly recommend you read the <a href="https://prodocs.cometchat.com/docs/concepts" target="_blank">Key Concepts</a> guide.

## Get your Application Keys

<a href="https://app.cometchat.io" target="_blank">Signup for CometChat</a> and then:

1. Create a new app: Enter a name & hit the **+** button
2. Head over to the **API Keys** section and click on the **Create API Key** button
3. Enter a name and select the scope as **Auth Only**
4. Now note the **API Key** and **App ID**

## Add the CometChat Dependency

### NPM
First, install via npm

`Shell`

For v1.8.x and older:

```shell
npm install @cometchat-pro/@cometchat-pro/react-native-@1.8.5 --save
```

For v2.0.x:

```shell
npm install @cometchat-pro/react-native-chat@2.0.2 --save
```

Then, import the `CometChat` object wherever you want to use CometChat

`JavaScript`

```Javascript 

import { CometChat } from "@cometchat-pro/react-native-chat" 

```


To learn more, please refer to our Javascript Developer Documentation:

For v1.8.x and older: <a href="https://prodocs.cometchat.com/docs/react-native-quick-start">Documentation</a>

For v2.0.x: <a href="https://prodocs.cometchat.com/v2.0/docs/react-native-quick-start">Documentation</a>