//###########################################################################
//###########################################################################
//##
//## Facebook API Discovery Program
//## 29/10/19
//##
//###########################################################################
//###########################################################################
    //##
    //## Local usage
    //##    http://localhost:5000/ProcessOption?MethodName=ShowLogs
    //## Web usage
    //##    https://damp-shelf-01778.herokuapp.com/ProcessOption?MethodName=ShowLogs
    //##
    //###########################################################################
    //###########################################################################
    //##                                                                                                                // TO_BE_CLEANED_IN_FINAL_VERSION
    //##    To verify (when run in heroku)                                                                              // TO_BE_CLEANED_IN_FINAL_VERSION
    //##        2019-11-14T14:23:18.383743+00:00 app[web.1]: Warning: connect.session() MemoryStore is not              // TO_BE_CLEANED_IN_FINAL_VERSION
    //##        2019-11-14T14:23:18.383792+00:00 app[web.1]: designed for a production environment, as it will leak     // TO_BE_CLEANED_IN_FINAL_VERSION
    //##        2019-11-14T14:23:18.383795+00:00 app[web.1]: memory, and will not scale past a single process.          // TO_BE_CLEANED_IN_FINAL_VERSION
    //##                                                                                                                // TO_BE_CLEANED_IN_FINAL_VERSION
    //###########################################################################                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //###########################################################################                                       // TO_BE_CLEANED_IN_FINAL_VERSION

    //---------------------------------------------------------------------------
    // Global vars
    //---------------------------------------------------------------------------

        'use strict'

        // Global Object
        var G                       = {};
        G.VersionToShow             = "22/11/19 - 09:55:13";

        // Loads library
        // npm install express@4.17.1 bodyParser@1.19.0 request@2.88.0      (will deprecate fb-messenger@0.1.4)
        const express               = require('express');       // express@4.17.1
        const bodyParser            = require('body-parser');   // bodyParser@1.19.0
        const request               = require('request');       // request@2.88.0

        // Creates an express instance
        const app                   = express();

        // Defines Port
        app.set                     ('port', (process.env.PORT || 5000));

            // Allows us to process the data
        app.use                     (bodyParser.urlencoded({extended: false}));
        app.use                     (bodyParser.json());

        // Loads Local Library (lib.js)
        // No installation required
        const fs                    = require('fs');
        var Lib                     = {};
        eval(fs.readFileSync("./lib.js") + "");

        // Loads Bot - Intelligence (BotIntelligence.js)
        // No installation required
        eval(fs.readFileSync("./BotIntelligence.js") + "");

    //===========================================================================
    //===========================================================================
    //==
    //== Data Information (ID's and Token's)
    //==
    //===========================================================================
    //===========================================================================

    //---------------------------------------------------------------------------
    // Users
    //---------------------------------------------------------------------------

        // User: Andre
        // http://www.facebook.com/andre.garcia.54540218
        G.User_Andre                = {};
        var User                    = G.User_Andre;
        User.ID                     = "<USER_ID>";
        User.ID                     = "2516745478405591";                                               // TO_BE_CLEANED_IN_FINAL_VERSION
                                                                                                        // TO_BE_CLEANED_IN_FINAL_VERSION
        // User: Cristina                                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
        G.User_Cristina             = {};                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
        var User                    = G.User_Cristina;                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
        User.ID                     = "3091657670908864";                                               // TO_BE_CLEANED_IN_FINAL_VERSION
                                                                                                        // TO_BE_CLEANED_IN_FINAL_VERSION
        // User: Andre 2                                                                                // TO_BE_CLEANED_IN_FINAL_VERSION
        //  G.User_Andre2           = {};                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
        //  var User                = G.User_Andre2;                                                    // TO_BE_CLEANED_IN_FINAL_VERSION
        //  //  User.ID             = "10212885554488459";          // (#100) No matching user found    // TO_BE_CLEANED_IN_FINAL_VERSION
        //  //  User.ID             = "122775329137146";            // (#100) No matching user found    // TO_BE_CLEANED_IN_FINAL_VERSION
                                                                                                        // TO_BE_CLEANED_IN_FINAL_VERSION
        //  // User: Mauricio                                                                           // TO_BE_CLEANED_IN_FINAL_VERSION
        //  G.User_Mauricio         = {};                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
        //  var User                = G.User_Mauricio;                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
        //  User.ID                 = "";                                                               // TO_BE_CLEANED_IN_FINAL_VERSION

    //---------------------------------------------------------------------------
    // Apps
    //---------------------------------------------------------------------------

        // App: MyFirstBot
        G.App_MyFirstBot            = {};
        var App                     = G.App_MyFirstBot;
        App.ID                      = "<APP_ID>";
        App.Secret                  = "<APP_SECRET>";
        App.Token                   = "<APP_TOKEN>";
        App.ID                      = "710301822769665";                                                // TO_BE_CLEANED_IN_FINAL_VERSION
        App.Secret                  = "505304f670216a41a8e462834922f430";                               // TO_BE_CLEANED_IN_FINAL_VERSION
        App.Token                   = "EAAKGBAfUWgEBALYjApvMiZCjz6ECk3kQHblgDN2pQOLtZA3mukJRqky0zZBjAZAZCvQVZAZA50WEk25RI1ZCslzZA4DV1uUkvukRq0iS0rD9pYpcvsjeHs1LiP0CYSZBXMjRw8hFFsEuJkMYiGTrWGBErfEZBXZCbSFdABAYoVlysZCrlEwZDZD";       // TO_BE_CLEANED_IN_FINAL_VERSION

        // App: BotIntelligence
        G.App_BotIntelligence       = {};
        var App                     = G.App_BotIntelligence;
        App.ID                      = "<APP_ID>";
        App.Secret                  = "<APP_SECRET>";
        App.Token                   = "<APP_TOKEN>";
        App.ID                      = "2526381890748474";                                               // TO_BE_CLEANED_IN_FINAL_VERSION
        App.Secret                  = "0143b26c6895dd95eaa9109a2a6f7812";                               // TO_BE_CLEANED_IN_FINAL_VERSION
        App.Token                   = "EAAj5ux8qQDoBADEiy7ZCX8ZBIesLlX3pUhZCKq2efkQFQPJPsx10JifDoyuYVNN7xNdia6J2DhZA2DCiNP1MnFZCQbBKyNpZCzkhSrRdisFj6pjXvtvFweSjaDyZBZBANqGG8LYcvsYcZA7l0TaJzbWc4KqbB2YAZB7IBccYGhJaMLXwZDZD";          // TO_BE_CLEANED_IN_FINAL_VERSION

    //---------------------------------------------------------------------------
    // Pages
    //---------------------------------------------------------------------------

        // Page: Sistema de Gestão com Consultoria
        G.Page_SistGestCons         = {};
        var Page                    = G.Page_SistGestCons;
        Page.ID                     = "104159447667634";
        Page.Token                  = G.App_BotIntelligence.Token;

    //---------------------------------------------------------------------------
    // Global definition
    //---------------------------------------------------------------------------

        // SendMessage
        G.SendMessage_Token         = G.App_BotIntelligence.Token;
        G.SendMessage_User          = G.User_Andre;
        //  G.SendMessage_User      = G.User_Cristina;

        // PostToAPage
        G.PostToAPage_Page          = G.Page_SistGestCons;

        // FacebookLogin
        G.App_To_FacebookLogin      = G.App_MyFirstBot;
        //  G.App_To_FacebookLogin  = G.App_BotIntelligence;

    //===========================================================================
    //===========================================================================
    //==
    //== express endpoints
    //==
    //===========================================================================
    //===========================================================================

    //---------------------------------------------------------------------------
    // This is the route that shows if the bot is corretly uploaded on Heroku
    // You can try opening your browser and typing:
    // https://damp-shelf-01778.herokuapp.com
    // http://localhost:5000
    // The expected response is the below message
    //---------------------------------------------------------------------------

    app.get('/', function(req, res)
        {
        res.send                    ("Hi I am the Facebook API discovery program in " + G.VersionToShow);
        });

    //---------------------------------------------------------------------------
    // This is the Bot Test route
    // You can try opening your browser and typing:
    // https://damp-shelf-01778.herokuapp.com/testbot?question=qual o seu nome ?
    // http://localhost:5000/testbot?question=qual o seu nome ?
    //---------------------------------------------------------------------------

    app.get('/testbot/', function(req, res)
        {
        Lib.Session_Begin           ("app.<b>get</b>.testbot", "req.body = " + req.query['question']);
        var ToShow                  = GetAnswer(req.query['question']);
        ToShow                      = ToShow.replace(/\r\n/gi, "<br>");
        res.send                    (ToShow);
        });

    //---------------------------------------------------------------------------
    // GetAnswer
    //---------------------------------------------------------------------------

    function GetAnswer(Question)
        {
        // Create
        var Ask                     = {};
        Ask.AskQuestion             = Question;

        // Process
        Lib.ProcessAsk              (Ask);

        // Prepare
        //  var ToShow              = "";
        //  ToShow                 += "Voce perguntou:\r\n   "                      + Ask.AskQuestion;
        //  ToShow                 += "\r\nEntendi sua pergunta como:\r\n   "       + Ask.Question;
        //  ToShow                 += "\r\nSe estiver correto a resposta e:\r\n   " + Ask.Answer;
        var ToShow                  = Ask.Answer;

        // Log
        Lib.DebugLog_Log            ("GetAnswer", Question.replace(/\r\n/gi, "<br>") + "<hr>" + ToShow.replace(/\r\n/gi, "<br>"));

        // Returns
        return ToShow;
        };

    //---------------------------------------------------------------------------
    // This is Facebook GET route
    // You can try opening your browser and typing:
    // https://damp-shelf-01778.herokuapp.com/webhook2?hub.verify_token=MyVerifyTokenDamp&hub.challenge=SometingToEcho
    // The expected response is SometingToEcho (in the above line)
    // On the:
    // https://developers.facebook.com
    // in the App configuration you will need to supply the callback URL
    // https://damp-shelf-01778.herokuapp.com/
    // AND the verify_token MyVerifyTokenDamp that you see bellow
    // So, Facebook will verify the callback URL calling GET and suplying SometingToEcho with some text and see the result.
    // http://localhost:5000/webhook2?hub.verify_token=MyVerifyTokenDamp&hub.challenge=SometingToEcho
    //---------------------------------------------------------------------------

    app.get('/webhook2/', function(req, res)
        {
        Lib.Session_Begin           ("app.<b>get</b>.webhook2", "req.body = " + JSON.stringify(req.body));
        if (req.query['hub.verify_token'] === "MyVerifyTokenDamp")
            {
            res.send                (req.query['hub.challenge']);
            }
        else
            res.send                ("Wrong token");
        });

    //---------------------------------------------------------------------------
    // Here is the POST request on the same endpoint (/webhook2/)
    // where Facebook Messenger will call on each page message
    // send by each user
    //---------------------------------------------------------------------------

    app.post('/webhook2/', function(req, res)
        {
        Lib.Session_Begin           ("app.<b>post</b>.webhook2", Lib.Inspect(req.body, "req.body"));    // "req.body = " + JSON.stringify(req.body) // TO_BE_CLEANED_IN_FINAL_VERSION
        try
            {
            //  var B               = C;                            // Error Simulation

            // Messaging events
            let messaging_events    = req.body.entry[0].messaging;

            // Is Message Postback ?
            if (messaging_events.length == 1)
                {
                var Event_0         = messaging_events[0];
                if (Event_0.postback)
                    {
                    Lib.DebugLog_Log("app.post.webhook2", Lib.Inspect(Event_0.postback, "Event_0.postback"));
                    var sender      = Event_0.sender.id;
                    var Resposta    = Event_0.postback.payload;
                    switch (Resposta)
                        {
                        case "CLICKED_ON_ME_AJUDOU":
                            G.SendTextMessage(null, G.SendMessage_Token, sender, "Ok, obrigado !", []);
                            break;
                        case "CLICKED_ON_NAO_ME_AJUDOU":
                            G.SendTextMessage(null, G.SendMessage_Token, sender, "Desculpe, vou tentar melhorar !", []);
                            break;
                        }
                    res.sendStatus  (200);
                    return;
                    }
                }

            // Is Page conversation ?
            for (let i = 0; i < messaging_events.length; i++)
                {
                let event           = messaging_events[i];
                let sender          = event.sender.id;
            
                // Store distincts event.sender.id
                let Found           =   false;
                for (let i = 0; i < G.ArrSenderIDs.length; i++)
                    {
                    if (sender == G.ArrSenderIDs[i])
                        {
                        Found       = ! false;
                        break;
                        }
                    }
                if (! Found)
                    {
                    Lib.DebugLog_Log("app.post.webhook2", "NEW sender = " + sender);
                    G.ArrSenderIDs.push(sender);
                    }

                //  Lib.DebugLog_Log("webhook2", Lib.Inspect(event, "event"));                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
                //  sendText        (sender, "Oi");                 // CAREFULL HERE: BECAMES IN LOOP                           // TO_BE_CLEANED_IN_FINAL_VERSION
                if (event.message && event.message.text)
                    {
                    // Gets ReceivedMsg
                    let text        = event.message.text;
                    var ReceivedMsg = text;

                    //---------------------------------------------------------------------------
                    // Builds ResponseMsg
                    // HERE IS WHERE THE AMANAJAX INTELIGENCE WILL PROCCEED
                    // USER INFORMATION MIGHT BE POSSIBLE in event.sender (NOT TESTED YET)
                    // ARTIFICIAL INTELIGENCE, DATA BASE, ETC. CAN BE APPLIED HERE
                    //---------------------------------------------------------------------------
                    var Question        = ReceivedMsg;
                    //  var ResponseMsg = "Ola aqui e o robo da minha pagina\r\nRecebi e te respondo logo:\r\n" + Question.substring(0, 100);
                    var ResponseMsg     = GetAnswer(Question);

                    var Buttons         = [];
                    Buttons.push        (
                        {
                        type            : "postback",
                        title           : "Resposta ajudou",                // BUTTON_TEXT
                        payload         : "CLICKED_ON_ME_AJUDOU"            // STRING_SENT_TO_WEBHOOK
                        });
                    Buttons.push        (
                        {
                        type            : "postback",
                        title           : "Resposta não ajudou",            // BUTTON_TEXT
                        payload         : "CLICKED_ON_NAO_ME_AJUDOU"        // STRING_SENT_TO_WEBHOOK
                        });

                    // Sends ResponseMsg
                    //  sendText        (sender, ResponseMsg); // No longer used (Deprecated)                           // TO_BE_CLEANED_IN_FINAL_VERSION
                    //G.SendTextMessage (CSes, Page_Token,          User_ID,    MsgToSend,   Buttons);
                    G.SendTextMessage   (null, G.SendMessage_Token, sender,     ResponseMsg, Buttons);
                    }
                }
            res.sendStatus          (200);
            }
        catch (e)
            {
            Lib.FatalErrorMNO       ("app.<b>post</b>.webhook2", "try-catch error:<br>" + e);
            }
        });

    //---------------------------------------------------------------------------                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    // Here is the method that sends the echo message                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //---------------------------------------------------------------------------                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //function sendText(sender, text)                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //  {                                                                                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
    //  var ToInspect               = {};                                                                                               // TO_BE_CLEANED_IN_FINAL_VERSION
    //  ToInspect.sender            = sender;                                                                                           // TO_BE_CLEANED_IN_FINAL_VERSION
    //  ToInspect.text              = text;                                                                                             // TO_BE_CLEANED_IN_FINAL_VERSION
    //  Lib.DebugLog_Log            ("sendText", Lib.Inspect(ToInspect, "ToInspect"));                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
    //  let messageData             = {text: text};                                                                                     // TO_BE_CLEANED_IN_FINAL_VERSION
    //  request                     (                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //      {                                                                                                                           // TO_BE_CLEANED_IN_FINAL_VERSION
    //      url                     : "https://graph.facebook.com/v2.6/me/messages",                                                    // TO_BE_CLEANED_IN_FINAL_VERSION
    //      qs                      : {access_token: G.SendMessage_Token},          // Query String with the above G.SendMessage_Token  // TO_BE_CLEANED_IN_FINAL_VERSION
    //      method                  : "POST",                                                                                           // TO_BE_CLEANED_IN_FINAL_VERSION
    //      json                    :                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //          {                                                                                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //          recipient           : {id: sender},                                                                                     // TO_BE_CLEANED_IN_FINAL_VERSION
    //          message             : messageData,                                                                                      // TO_BE_CLEANED_IN_FINAL_VERSION
    //          }                                                                                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //      }, function(error, response, body)                                                                                          // TO_BE_CLEANED_IN_FINAL_VERSION
    //          {                                                                                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //          if (error)                                                                                                              // TO_BE_CLEANED_IN_FINAL_VERSION
    //              {                                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //              //  console.log ("sending error");                                                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
    //              Lib.DebugLog_Log("sendText", "sending error: " + error);                                                            // TO_BE_CLEANED_IN_FINAL_VERSION
    //              }                                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //          else                                                                                                                    // TO_BE_CLEANED_IN_FINAL_VERSION
    //          if (response.body.error)                                                                                                // TO_BE_CLEANED_IN_FINAL_VERSION
    //              {                                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //              //  console.log ("response body error");                                                                            // TO_BE_CLEANED_IN_FINAL_VERSION
    //              Lib.DebugLog_Log("sendText", Lib.Inspect(body.error, "Error occurred (in body.error):"));                           // TO_BE_CLEANED_IN_FINAL_VERSION
    //              }                                                                                                                   // TO_BE_CLEANED_IN_FINAL_VERSION
    //          else                                                                                                                    // TO_BE_CLEANED_IN_FINAL_VERSION
    //              Lib.DebugLog_Log("sendText", "Message sent correctly");                                                             // TO_BE_CLEANED_IN_FINAL_VERSION
    //          }                                                                                                                       // TO_BE_CLEANED_IN_FINAL_VERSION
    //      );                                                                                                                          // TO_BE_CLEANED_IN_FINAL_VERSION
    //  };                                                                                                                              // TO_BE_CLEANED_IN_FINAL_VERSION

    //===========================================================================
    //===========================================================================
    //==
    //== Discovery Methods
    //== (must have one method for each G.AddOption in G.Configure above)
    //==
    //===========================================================================
    //===========================================================================

    //---------------------------------------------------------------------------
    // ShowLogs
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (  false,     false,        "ShowLogs",             "Exibe os Logs");
    G.ShowLogs                      = function ShowLogs(CSes)
        {
        // Does nothing here
        };

    //---------------------------------------------------------------------------
    // ClearLogs
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (  false,     false,        "ClearLogs",            "Limpa os Logs");
    G.ClearLogs                     = function ClearLogs(CSes)
        {
        G.SessionID                 = 0;
        G.DebugLogs                 = [];
        };

    //---------------------------------------------------------------------------
    // ShowArrSenderIDs
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (  false,     false,        "ShowArrSenderIDs",     "Exibe os IDs dos Usuários que \"falaram\" com a página");
    G.ShowArrSenderIDs              = function ShowArrSenderIDs(CSes)
        {
        Lib.DebugLog_Log            ("G.ShowArrSenderIDs", "G.ArrSenderIDs = [" + G.ArrSenderIDs + "]");
        };

    //---------------------------------------------------------------------------
    // ClearArrSenderIDs
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (  false,     false,        "ClearArrSenderIDs",    "Limpa os IDs dos Usuários que \"falaram\" com a página");
    G.ClearArrSenderIDs             = function ClearArrSenderIDs(CSes)
        {
        G.ArrSenderIDs              = [];
        Lib.DebugLog_Log            ("G.ClearArrSenderIDs", "G.ArrSenderIDs = [" + G.ArrSenderIDs + "]");
        };

    //---------------------------------------------------------------------------
    // Envia Mensagem
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (  false,     false,        "",                     "");
    G.AddOption                     (! false,   ! false,        "BotProativoAPIS",      "(Bot Proativo) Envia Mensagem");
    G.BotProativoAPIS = function BotProativoAPIS(CSes)
        {
        var MessageToSend           = "Mensagem enviada\r\nVia Send API\r\nem: " + (new Date()).ToStr();
        G.SendTextMessage           (CSes, G.SendMessage_Token, G.SendMessage_User.ID, MessageToSend, [], function (Prps)
            {
            //  Lib.DebugLog_Log    ("G.BotProativoAPIS", Lib.Inspect(Prps, "Prps in event"));                                                                      // TO_BE_CLEANED_IN_FINAL_VERSION
            // Redirect to Menu
            Lib.RedirectToMenu      (CSes);
            });
        // Remove below comment to see 2 messages sent                                                                                                              // TO_BE_CLEANED_IN_FINAL_VERSION
        // OBSERVED: Sometimes the second message arrives to the user first than the very first message (?!?!?!?!)                                                  // TO_BE_CLEANED_IN_FINAL_VERSION
        //  G.SendTextMessage       (CSes, G.SendMessage_Token, G.SendMessage_User.ID, "Mensagem enviada 2\r\nVia Send API\r\nem: " + (new Date()).ToStr(), []);    // TO_BE_CLEANED_IN_FINAL_VERSION
        };

    //---------------------------------------------------------------------------
    // Envia Mensagem com Botões
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (! false,   ! false,        "BotProativoAPIS_CB",   "(Bot Proativo) Envia Mensagem com Botões");
    G.BotProativoAPIS_CB = function BotProativoAPIS_CB(CSes)
        {
        var MessageToSend           = "Selecione a opção desejada";
        var Buttons                 = [];
        Buttons.push                (
            {
            type                    : "web_url",
            title                   : "Visite a Solvertank",
            url                     : "http://www.solvertank.com"
            });
        Buttons.push                (
            {
            type                    : "web_url",
            title                   : "Visite a XPNet",
            url                     : "http://www.xpnet.com.br"
            });
        Buttons.push                (
            {
            type                    : "postback",
            title                   : "Quer mais informações ?",                // BUTTON_TEXT
            payload                 : "CLICKED_ON_QUER_MAIS_INFORMACOES"        // STRING_SENT_TO_WEBHOOK
            });
        G.SendTextMessage           (CSes, G.SendMessage_Token, G.SendMessage_User.ID, MessageToSend, Buttons, function (Prps)
            {
            //  Lib.DebugLog_Log    ("G.BotProativoAPIS", Lib.Inspect(Prps, "Prps in event"));                                                      // TO_BE_CLEANED_IN_FINAL_VERSION
            // Redirect to Menu
            Lib.RedirectToMenu      (CSes);
            });
        };

    //---------------------------------------------------------------------------
    // Send Text Message via API Send
    //---------------------------------------------------------------------------

    G.SendTextMessage = function SendTextMessage(CSes, Page_Token, User_ID, MsgToSend, Buttons, OnEnd)
        {
        //---------------------------------------------------------------------------
        // https://developers.facebook.com/docs/messenger-platform/reference/send-api
        // https://developers.facebook.com/docs/messenger-platform/send-messages/
        //---------------------------------------------------------------------------
        // messaging_type
        //      Messaging Type
        //          Description
        //      RESPONSE
        //          Message is in response to a received message.
        //          This includes promotional and non-promotional messages sent inside
        //              the 24-hour standard messaging window or under the 24+1 policy.
        //          For example, use this tag to respond if a person asks for a reservation
        //              confirmation or an status update.
        //      UPDATE
        //          Message is being sent proactively and is not in response to a received message.
        //          This includes promotional and non-promotional messages sent inside the the
        //          24-hour standard messaging window or under the 24+1 policy.
        //      MESSAGE_TAG
        //          Message is non-promotional and is being sent outside the 24-hour standard
        //              messaging window with a message tag. The message must match the allowed use case for the tag.
        //---------------------------------------------------------------------------

        var Message                 = {};
        if (Buttons.length == 0)
            {
            Message.text            = MsgToSend;
            }
        else
            {
            Message.attachment      =
                {
                type                : "template",
                payload             :
                    {
                    template_type   : "button",
                    text            : MsgToSend,
                    buttons         : Buttons
                    }
                }
            }

        // Setup Info Object
        var InfoObj                 =
            {
            uri                     : "https://graph.facebook.com/v5.0/me/messages",
            qs                      : {access_token: Page_Token},
            method                  : "POST",
            json                    :
                {
                messaging_type      : "RESPONSE",
                recipient           : {id: User_ID},
                message             : Message
                }
            };

        // Send the request
        request                     (InfoObj, function (error, response, body)
            {
            //                                                                                                              // TO_BE_CLEANED_IN_FINAL_VERSION
            // Show the request event arguments                                                                             // TO_BE_CLEANED_IN_FINAL_VERSION
            //  Lib.DebugLog_Log    ("G.SendTextMessage", Lib.Inspect(arguments, "Inspecting request event arguments"));    // TO_BE_CLEANED_IN_FINAL_VERSION

            // Error ?
            if (body)
                {
                if (body.error)
                    Lib.DebugLog_Log("G.SendTextMessage", Lib.Inspect(body.error, "Error occurred (in body.error):"));
                else
                    Lib.DebugLog_Log("G.SendTextMessage", "Message sent correctly<br>" + MsgToSend);
                }
            else
                Lib.DebugLog_Log    ("G.SendTextMessage", Lib.Inspect(arguments, "Inspecting request event arguments (no body)"));

            if (OnEnd)
                {
                var Prps            = {};
                Prps.InfoObj        = InfoObj;
                Prps.error          = error;
                Prps.response       = response;
                Prps.body           = body;
                OnEnd               (Prps);
                }
            });

        //---------------------------------------------------------------------------
        // Observed Errors
        //---------------------------------------------------------------------------
        //  (#10)   This message is sent outside of allowed window.
        //          You need page_messaging_subscriptions permission to be able to do it.
        //          Learn more about the new policy here:
        //          https://developers.facebook.com/docs/messenger-platform/policy-overview",
        //---------------------------------------------------------------------------
        };

    //---------------------------------------------------------------------------
    // PostToAPage
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (! false,   ! false,        "PostToAPage",          "Escreve um Posts na Pagina publicada");
    G.PostToAPage = function PostToAPage(CSes)
        {
        //---------------------------------------------------------------------------
        // https://developers.facebook.com/docs/pages/publishing/
        // https://lorenstewart.me/2017/03/12/using-node-js-to-interact-with-facebooks-graph-api/
        //---------------------------------------------------------------------------

        var ID                      = G.PostToAPage_Page.ID;
        var Token                   = G.PostToAPage_Page.Token;

        var InfoObj                 =
            {
            uri                     : "https://graph.facebook.com/" + ID + "/feed",
            qs                      :
                {
                message             : "Mensagem publicada por robo",
                access_token        : Token
                },
            method                  : "POST",
            json                    :
                {
                }
            };
        request                     (InfoObj, function (error, response, body)
            {
            Lib.DebugLog_Log        ("G.PostToAPage", Lib.Inspect(arguments, "Inspecting request event arguments"));

            // Redirect to Menu
            Lib.RedirectToMenu      (CSes);
            });

        //---------------------------------------------------------------------------
        // Observed Errors
        //---------------------------------------------------------------------------
        //  (#200)  If posting to a group, requires app being installed in the group, and \
        //          either publish_to_groups permission with user token, or both manage_pages \
        //          and publish_pages permission with page token; If posting to a page, \
        //          requires both manage_pages and publish_pages as an admin with \ sufficient administrative permission
        // XPTO - Not solved yet.
        //---------------------------------------------------------------------------
        };

    //---------------------------------------------------------------------------
    // FacebookLogin
    //---------------------------------------------------------------------------

    // G.AddOption                  (Opt_Log,   Opt_ShowClick,  Opt_MethodName,         Opt_Caption);
    G.AddOption                     (! false,   ! false,        "FacebookLogin",        "Login via Facebook");
    // Exceptionally, this method is not called (auth/facebook will be "called" instead) (see Lib.Menu_PushToShow if desired)
    //G.FacebookLogin = function FacebookLogin(CSes)
    //  {
    //  };

        //¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
        // For Facebook Login (begin)

        //---------------------------------------------------------------------------
        //  https://www.youtube.com/watch?v=w1xitaKDcI4
        //      How to Build A Facebook Log In Feature with PassportJS and Passport Facebook Strategy
        //  https://www.youtube.com/watch?v=-RCnNyD0L-s
        //      Node.js Passport Login System Tutorial
        //  https://www.youtube.com/watch?v=Ud5xKCYQTjM
        //      Build Node.js User Authentication - Password Login
        //---------------------------------------------------------------------------

        // npm install express-session@1.17.0
        // npm install passport@0.4.0
        // npm install passport-facebook@3.0.0
        const session               = require('express-session');   // express-session@1.17.0
        const passport              = require('passport');          // passport@0.4.0
        const FacebookStrategy      = require('passport-facebook'); // passport-facebook@3.0.0

        // Heroku reports...
        //      2019-10-31T22:38:18.267243+00:00 app[web.1]: Warning: connect.session() MemoryStore is not
        //      2019-10-31T22:38:18.26729+00:00  app[web.1]: designed for a production environment, as it will leak
        //      2019-10-31T22:38:18.267293+00:00 app[web.1]: memory, and will not scale past a single process.
        //      2019-10-31T22:38:18.276453+00:00 app[web.1]: running: port

        app.use                     (session(
            {
            secret                  : "anystringoftext",
            resave                  : ! false,
            saveUninitialized       : ! false
            }));

        var fbOpts                  =
            {
            clientID                : G.App_To_FacebookLogin.ID,
            clientSecret            : G.App_To_FacebookLogin.Secret,
            //  callbackURL         : "http://localhost:5000/auth/facebook/callback"
            callbackURL             : "https://damp-shelf-01778.herokuapp.com/auth/facebook/callback/",
            // To get more User Info...
            profileFields           : ["displayName", "emails"]
            };

        var fbCallback              = function (accessToken, refreshToken, profile, cb)
            {
            Lib.DebugLog_Log        ("fbCallback", Lib.Inspect(arguments, "Inspecting fbCallback arguments"));
            //---------------------------------------------------------------------------
            //  Lib.DebugLog_Log    ("fbCallback", "cb = " + cb);
            //  The above line shows below function
            //  cb                  = function verified(err, user, info)
            //      {
            //      if (err)
            //          {
            //          return self.error(err);
            //          }
            //      if (! user)
            //          {
            //          return self.fail(info);
            //          }
            //      info            = info || {};
            //      if (state)
            //          {
            //          info.state = state;
            //          }
            //      self.success    (user, info);
            //      }
            //---------------------------------------------------------------------------

            // https://stackoverflow.com/questions/35858226/facebooktokenerror-this-authorization-code-has-been-used
            cb                      (null, profile);
            };

        // FacebookStrategy
        passport.use                (new FacebookStrategy(fbOpts, fbCallback));

        // https://damp-shelf-01778.herokuapp.com/auth/facebook
        // http://localhost:5000/auth/facebook
        //app.route("/auth/facebook")
        //  .get        (function (req, res)
        //      {
        //      res.send            ("Hello foo bar !");
        //      });
        app.route("/auth/facebook")
            .get(passport.authenticate('facebook'));
            // To change scope use below line instead above line
            //  .get(passport.authenticate('facebook', {scope:["email"]} ) );

        // https://damp-shelf-01778.herokuapp.com/auth/facebook/callback/
        // http://localhost:5000/auth/facebook/callback
        // app.route("/auth/facebook/callback")
        // .get(function (req, res)
        //      {
        //      res.send            ("Check Status");
        //      });
        app.route("/auth/facebook/callback").get(CallBack_F_1, CallBack_F_2);

        // CallBack_F_1
        function CallBack_F_1(req, res, next)
            {
            Lib.DebugLog_Log        ("CallBack_F_1 (A)", "arguments.length = " + arguments.length);

            passport.authenticate   ('facebook', function (err, user, info)
                {
                Lib.DebugLog_Log    ("passport.authenticate", Lib.Inspect(arguments, "Inspecting passport.authenticate Event arguments"));

                //---------------------------------------------------------------------------
                // DO HERE WHAT YOU WANT WITH FACEBOOK USER DATA
                //---------------------------------------------------------------------------

                //---------------------------------------------------------------------------
                // IN CASE OF LOGIN SUCCESS WAS OBSERVED HERE:
                //      arguments[0] =  err                 = null
                //      arguments[1] =  user                = [Object]
                //                      user.id             = "10212885554488459"
                //                      user.displayName    = "Andre Garcia"
                //                      user.emails         = array of objects like EMail.value
                //      arguments[2] =  info                = [Object] (with no properties)
                //---------------------------------------------------------------------------

                //---------------------------------------------------------------------------
                // IN CASE OF LOGIN ERROR (User credentials error) WAS OBSERVED HERE:
                //      arguments[0] =  err                 = null
                //      arguments[1] =  user                = false
                //      arguments[2] =  info                = [Object]
                //                      info.message        = "Permissions error"
                //      arguments[3] =  undefined
                //---------------------------------------------------------------------------

                //---------------------------------------------------------------------------
                //  One time, returned here in err argument:
                //      {
                //      "name"      : "FacebookTokenError",
                //      "message"   : "This authorization code has been used.",
                //      "type"      : "OAuthException",
                //      "code"      : 100,
                //      "traceID"   : "ARG1Dbhen_9jUDa0fekIEYA",
                //      "status"    : 500
                //      }
                //---------------------------------------------------------------------------

                // This next will call CallBack_F_2 only after the passport.authenticate
                next                ();
                })(req, res, next);

            // To confirm that passport.authenticate does not call the event immediatelly
            Lib.DebugLog_Log        ("CallBack_F_1 (B)", "arguments.length = " + arguments.length);

            //  next                ();
            }

        // CallBack_F_2
        function CallBack_F_2(req, res, next)
            {
            Lib.DebugLog_Log        ("CallBack_F_2", "arguments.length = " + arguments.length);

            // EXTRA VERIFICATION CAN BE DONE HERE

            // Redirect to ShowLogs
            res.redirect            ("/ProcessOption?MethodName=ShowLogs");

            // next no longer necessary here
            //  next                ();
            }

        //---------------------------------------------------------------------------
        // Observed Events Sequence
        //---------------------------------------------------------------------------
        //  https://damp-shelf-01778.herokuapp.com/auth/facebook should be called to ask Facebook Login (try it in your browser)
        //  app.route("/auth/facebook") will be called here
        //  passport.authenticate('facebook') will provide Facebook Login management page
        //  if Facebook authenticates, fbCallback is called with user Information
        //  cb(null, profile); calls Facebook back again
        //  So, finally, Facebook calls /auth/facebook/callback endpoint
        //      (that should be registered in Valid OAuth Redirect URIs App)
        //      and DO THERE WHAT YOU WANT WITH FACEBOOK USER DATA
        //---------------------------------------------------------------------------

        //---------------------------------------------------------------------------
        // Observed Errors
        //---------------------------------------------------------------------------
        //  Can't Load URL
        //      The domain of this URL isn't included in the app's domains.
        //      To be able to load this URL, add all domains and subdomains of
        //          your app to the App Domains field in your app settings.
        //---------------------------------------------------------------------------
        //  Não é possível carregar a URL:
        //      O domínio dessa URL não está incluído nos domínios do aplicativo.
        //      Para poder carregar essa URL, adicione todos os domínios e subdomínios
        //      ao campo Domínios do aplicativo nas configurações do aplicativo.
        //---------------------------------------------------------------------------
        //  https://www.youtube.com/watch?v=dOHBn1yMitU
        //      Can't Load URL: The domain of this URL isn't included in the app's domains
        //      Client OAuth Login
        //          -> No
        //      Valid OAuth Redirect URIs
        //          https://damp-shelf-01778.herokuapp.com/auth/facebook/callback/
        //---------------------------------------------------------------------------
        //  URL Blocked
        //      This redirect failed because the redirect URI is not whitelisted in the app’s
        //      Client OAuth Settings. Make sure Client and Web OAuth Login are on and add
        //      all your app domains as Valid OAuth Redirect URIs.
        //---------------------------------------------------------------------------
        //  URL bloqueada:
        //      O redirecionamento falhou porque o URl usado não está na lista de liberação
        //      nas configurações de OAuth do cliente do aplicativo.
        //      Verifique se o login de OAuth do cliente e da Web está ativado e adicione
        //      todos os domínios do seu aplicativo como URls válidos de redirecionamento de OAuth.
        //---------------------------------------------------------------------------

        // For Facebook Login (end)
        //___________________________________________________________________________

    //---------------------------------------------------------------------------
    // Include more Option Methods here (if you want)
    //---------------------------------------------------------------------------

    //===========================================================================
    //===========================================================================
    //==
    //== Main Listen Method
    //==
    //===========================================================================
    //===========================================================================

    //---------------------------------------------------------------------------
    // Here the http server starts listening
    //---------------------------------------------------------------------------

    app.listen(app.get('port'), function()
        {
        console.log                 ("running: port");
        });

//###########################################################################
//###########################################################################
