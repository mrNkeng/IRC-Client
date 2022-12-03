import { Root } from "data-models/IRCData";

const data: Root =  {
  "ServerList": [
    {
      "serverMessages": [],
      "serverName": "irc.valanidas.dev",
      "userList": ["Michael","Christopher","John","Ryan"],
      "channelList": [
        {
          "channelName": "#general",
          "messages": ["hello", "welcome"]
        },
        {
          "channelName": "#about",
          "messages": ["This is a message, could be MTOD"]
        },
        {
          "channelName": "#video-games",
          "messages": ["What's your favorite video game?", "Starbound"]
        },
        {
          "channelName": "#homework",
          "messages": ["What's the answer to 7c", "215819"]
        }
      ]
    },
    {
      "serverName": "Coolest Server Ever",
      "userList": ["Jessica","Matthew","Joseph","Christopher"],
      "serverMessages": [],
      "channelList": [
        {
          "channelName": "#general",
          "messages": ["hello", "welcome"]
        },
        {
          "channelName": "#about",
          "messages": ["This is a message, could be MTOD"]
        },
        {
          "channelName": "#video-games",
          "messages": ["What's your favorite video game?"]
        }
      ]
    },
    {
      "serverName": "Another One",
      "serverMessages": [],
      "userList": ["Jennifer","Ashley","Andrew"],
      "channelList": [
        {
          "channelName": "#general",
          "messages": ["hello", "welcome"]
        },
        {
          "channelName": "#about",
          "messages": ["MTOD"]
        }
      ]
    },
    {
      "serverName": "Yet another SERVER",
      "serverMessages": [],
      "userList": ["Amanda","Joshua","Daniel"],
      "channelList": [
        {
          "channelName": "#general",
          "messages": ["hello", "welcome"]
        },
        {
          "channelName": "#about",
          "messages": ["This is a message, could be MTOD"]
        }
      ]
    },
    {
      "serverName": "Jay D Server",
      "serverMessages": [],
      "userList": ["David","James","Robert"],
      "channelList": [
        {
          "channelName": "#general",
          "messages": ["hello", "welcome"]
        },
        {
          "channelName": "#about",
          "messages": ["This is a message, could be MTOD"]
        },
        {
          "channelName": "#video-games",
          "messages": ["What's your favorite video game?"]
        }
      ]
    }
  ]
}



export default data;
