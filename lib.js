//###########################################################################
//###########################################################################
//##
//## Facebook Messenger Bot - Library
//## 29/10/19
//##
//###########################################################################
//###########################################################################

		// Options Array
		G.Opts						= [];

		// Global vars
		G.SessionID					= 0;
		G.DebugLogs					= [];
		G.ArrSenderIDs				= [];

		// Attaches
		Lib.Var						= {};

	//===========================================================================
	//===========================================================================
	//==
	//== Options configuration methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Test Write Page Post
	//---------------------------------------------------------------------------

	G.AddOption = function AddOption(Opt_Log, Opt_ShowClick, Opt_MethodName, Opt_Caption)
		{
		// Creates
		var Opt						= {};

		// Defines
		Opt.Log						= Opt_Log;
		Opt.ShowClick				= Opt_ShowClick;
		Opt.MethodName				= Opt_MethodName;
		Opt.Caption					= Opt_Caption;

		// Store
		G.Opts.push					(Opt);
		};

	//===========================================================================
	//===========================================================================
	//==
	//== express endpoints
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// This is the route that process some action
	// You can try opening your browser and typing:
	// https://damp-shelf-01778.herokuapp.com/ProcessOption?MethodName=ShowLogs
	// http://localhost:5000/ProcessOption?MethodName=ShowLogs
	//---------------------------------------------------------------------------

	app.get('/ProcessOption/', function(req, res)
		{
		// Creates an empty ToShow array
		var ToShow					= [];

		// Defines Control Session
		var CSes					= {};
		CSes.req					= req;
		CSes.res					= res;
		CSes.ToShow					= ToShow;

		// Push CSS
		Lib.Menu_PushCSSToShow		(ToShow);

		// Push Menu
		Lib.Menu_PushToShow			(ToShow);

		// Recover MethodName from query string
		var MethodName				= req.query.MethodName;

		// Search for the Option
		var Found					=   false;
		var Opt;
		for (var i = 0; i < G.Opts.length; i++)
			{
			Opt						= G.Opts[i];
			if (Opt.MethodName != MethodName)
				continue;
			Found					= ! false;
			break;
			}

		// If Found, process according the MethodName
		if (Found)
			{
			// Session_Begin
			if (Opt.Log)
				Lib.Session_Begin	("get.ProcessOption", "MethodName = " + MethodName);

			// Runs protected against errors
			try
				{
				G[Opt.MethodName]	(CSes);
				}
			catch (e)
				{
				Lib.FatalErrorMNO	("ProcessOption", "MethodName = " + MethodName, "try-catch error:<br>" + e);
				}

			if (Opt.ShowClick)
				ToShow.push			("Clique em <b>Exibe os Logs</b> para ver se ha mais informações.");
			}
		else
			{
			// Not Found
			ToShow.push				("<h3><font color='FF0000'>MethodName [" + MethodName + "] not found.</font><h3>");
			}

		// Push DebugLog
		Lib.DebugLog_PushToShow		(ToShow);

		// Sends ToShow
		if (! Opt.ShowClick)
			res.send				(ToShow.join(""));
		});

	//===========================================================================
	//===========================================================================
	//==
	//== Auxiliary Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Redirect to Menu
	//---------------------------------------------------------------------------

	Lib.RedirectToMenu = function Lib_RedirectToMenu(CSes)
		{
		//	Lib.DebugLog_Log		("Lib.RedirectToMenu", "(A)");	// TO_BE_CLEANED_IN_FINAL_VERSION
		CSes.res.redirect			("/ProcessOption?MethodName=ShowLogs");
		//	Lib.DebugLog_Log		("Lib.RedirectToMenu", "(B)");	// TO_BE_CLEANED_IN_FINAL_VERSION
		};

	//---------------------------------------------------------------------------
	// Number.FZeros
	//---------------------------------------------------------------------------

	Number.prototype.FZeros = function _Number_FZeros(Size)
		{
		var Result					= "0000000000" + this;
		return Result.substr(Result.length - Size, Size);
		};

	//---------------------------------------------------------------------------
	// Date.ToStr
	//---------------------------------------------------------------------------

	Date.prototype.ToStr = function _Date_ToStr()
		{
		var Day						= this.getDate			();
		var Month					= this.getMonth			() + 1;
		var Year					= this.getFullYear		();
		var Hour					= this.getHours			();
		var Min						= this.getMinutes		();
		var Sec						= this.getSeconds		();
		var MSec					= this.getMilliseconds	();
		return Day.FZeros(2) + "/" + Month.FZeros(2) + "/" + Year.FZeros(4) + " " +		Hour.FZeros(2) + ":" + Min.FZeros(2) + ":" + Sec.FZeros(2) + "," + MSec.FZeros(3);
		//	return																		Hour.FZeros(2) + ":" + Min.FZeros(2) + ":" + Sec.FZeros(2) + "," + MSec.FZeros(3);
		};

	//---------------------------------------------------------------------------
	// Fatal Error MNO (May Never Occur)
	//---------------------------------------------------------------------------

	Lib.FatalErrorMNO = function FatalErrorMNO(SoftwarePoint)
		{
		//	// To avoid cascade call
		//	if (Lib.FatalErrorMNO_Occur)
		//		return;
		//	Lib.FatalErrorMNO_Occur	= ! false;

		var Result					= [];
		Result.push					("<table border=1>");

		Result.push					("<tr>");
		Result.push					("<td>");
		Result.push					("<h1>FatalErrorMNO</h1>");
		Result.push					("</td>");
		Result.push					("</tr>");

		Result.push					("<tr>");
		Result.push					("<td>");
		Result.push					("<h2>" + SoftwarePoint + "</h2>");
		Result.push					("</td>");
		Result.push					("</tr>");

		for (var i = 1; i < arguments.length; i++)
			{
			Result.push				("<tr>");
			Result.push				("<td>");
			Result.push				(arguments[i]);
			Result.push				("</td>");
			Result.push				("</tr>");
			}

		Result.push					("</table>");
		var ToShow					= Result.join("");
		//	Lib.RW					(ToShow);

		// Log !
		Lib.DebugLog_Log			(SoftwarePoint, ToShow);

		// throw
		// XPTO - FIX HERE
		//	throw ToShow;
		};

	//---------------------------------------------------------------------------
	// Gets a logical Type of a var
	//		Returns one of:
	//			"undefined"
	//			"boolean"
	//			"number"
	//			"string"
	//			"function"
	//			"null"
	//			"date"
	//			"array"
	//			"object"
	//			---
	//			"olnydump"
	//---------------------------------------------------------------------------

	Lib.Var.TypeOf = function TypeOf(VarValue)
		{
		// The typeof operator returns type information as a string. There are six possible values that typeof returns:
		//		"undefined", "boolean", "number", "string", "function" and "object"
		var MyTypeOf				= typeof(VarValue);
		switch (MyTypeOf)
			{
			case "undefined":
			case "boolean":
			case "number":
			case "string":
			case "function":
				return MyTypeOf;
			case "object":
				if (VarValue == null)
					return "null";
				//	Lib.DebugLog_Log("Lib.Var.TypeOf", "VarValue.constructor = " + VarValue.constructor + ", Is Date = " + (VarValue.constructor == Date) + ", Is Array = " + (VarValue.constructor == Array));
				try
					{
					switch (VarValue.constructor)
						{
						case Date:
							//var B = C;							// Error simulation
							return "date";
						case Array:
							return "array";
						case Object:
							// Occurs in objects like, for example, {}
							return "object";
						default:
							// Ocurred in VarValue.constructor = function IncomingMessage(socket)
							//	Lib.FatalErrorMNO("Lib.Var.TypeOf", "Unknown VarValue.constructor", "MyTypeOf = " + MyTypeOf, "VarValue = " + VarValue, "VarValue.constructor = " + VarValue.constructor);
							//	return "???";

							// Raised the below unkown error
							// Assertion failed: (object->InternalFieldCount()) > (0), file c:\workspace\iojs+release\nodes\win2008r2-release-ia32\src\util-inl.h, line 196
							// return "object";
							return "olnydump";
						}
					}
				catch (e)
					{
					Lib.FatalErrorMNO("Lib.Var.TypeOf", "Unknown <b><u>object</u></b> constructor", "MyTypeOf = " + MyTypeOf, "VarValue = " + VarValue, "VarValue.constructor = " + VarValue.constructor);
					//	// Occured in Server.CreateObject("ADODB.Connection")
					//	// Operation is not allowed when the object is closed.
					return "???" + GetErrorDescription(e);
					}
				Lib.FatalErrorMNO	("obLibVar.TypeOf", "Unknown <b><u>object</u></b> typeof(VarValue)", "typeof(VarValue) = " + MyTypeOf, "VarValue = " + VarValue);
				return "???"

			default:
				Lib.FatalErrorMNO	("Lib.Var.TypeOf", "Unknown typeof(VarValue)", "typeof(VarValue) = " + MyTypeOf, "VarValue = " + VarValue);
				return "Unknown MyTypeOf [" + MyTypeOf + "]";
			}
		};

	//---------------------------------------------------------------------------
	// Colects and build to show an object (or var) properties
	//---------------------------------------------------------------------------
	//	// For Testing
	//	var TestObj					= {};
	//	TestObj.V_undefined			= Lib.XXX;
	//	TestObj.V_boolean			= ! false;
	//	TestObj.V_number			= 61;
	//	TestObj.V_string			= "Andre Garcia";
	//	TestObj.V_function			= G.ShowLogs;
	//	TestObj.V_null				= null;
	//	TestObj.V_date				= new Date();
	//	TestObj.V_array				= [TestObj.V_undefined, TestObj.V_boolean, TestObj.V_number, TestObj.V_string, TestObj.V_function, TestObj.V_null, TestObj.V_date, [1, 2, 3], {name:"Andre", age:61}];
	//	TestObj.V_object			= {name:"Andre", age:61};
	//	Lib.DebugLog_Log			("PutSomewhere", Lib.Inspect(TestObj, "My Caption"));
	//---------------------------------------------------------------------------

	Lib.Inspect = function Inspect(Obj, Caption)
		{
		// Gets Obj_Type
		var Obj_Type				= Lib.Var.TypeOf(Obj);

		// Proceed according
		switch (Obj_Type)
			{
			case "undefined":
			case "boolean":
			case "number":
			case "string":
				return "" + Obj;

			case "function":
				// XPTO - Funcion Name
				return "...";

			case "null":
				return "" + Obj;									// Will return "null"

			case "date":
				return Obj.ToStr();

			case "array":
				var ToShow			= [];
				ToShow.push			("<table border=0 class='TB_Ext' cellspacing=1 cellpadding=2>");
				for (var i = 0; i < Obj.length; i++)
					{
					ToShow.push		("<tr>");
					ToShow.push		("<td class='TD_HR'>" + i							+ "</td>");
					ToShow.push		("<td class='TD_DL'>" + Lib.Var.TypeOf	(Obj[i])	+ "</td>");
					// XPTO - Reenter Level ?
					ToShow.push		("<td class='TD_DL'>" + this.Inspect	(Obj[i])	+ "</td>");
					ToShow.push		("</tr>");
					}
				ToShow.push			("</table>");
				return ToShow.join("");

			case "object":
				// Hadled below
				break;

			case "olnydump":
				//	return "" + Obj;
				return JSON.stringify(Obj);

			default:
				Lib.FatalErrorMNO	("Lib.Inspect", "Unknown Obj_Type.", "Obj_Type = \"" + Obj_Type + "\"", "Obj = \"" + Obj + "\"");
				return "??? (Lib.Inspect)";
			}

		var ToShow					= [];

		// Table begin
		ToShow.push					("<table border=0 class='TB_Ext' cellspacing=1 cellpadding=2>");

		// Caption ?
		if (Caption)
			{
			ToShow.push				("<tr>");
			ToShow.push				("<td class='TD_HL' colspan=4><h3><b>" + Caption + "</b></h3></td>");
			ToShow.push				("</tr>");
			}

		// ClassName
		//if (ShowClass)
		//	{
			var ClassName			= "" + Obj.constructor;
			ClassName				= ClassName.substr(0, 50) + "...";
			//
			ToShow.push				("<tr>");
			ToShow.push				("<td class='TD_HL' colspan=4>" + ClassName + "</td>");
			ToShow.push				("</tr>");
		//	}

		// Header
		ToShow.push					("<tr>");
		ToShow.push					("<td class='TD_HR'>#</td>");
		ToShow.push					("<td class='TD_HL'>Prop<br>Name</td>");
		ToShow.push					("<td class='TD_HL'>Prop<br>Type</td>");
		ToShow.push					("<td class='TD_HL'>Prop<br>Value</td>");
		ToShow.push					("</tr>");

		var Props_Count				= 0;
		for (var Prop_Name in Obj)
			{
			Props_Count++;

			// Gets Property Value
			var Prop_Value			= Obj[Prop_Name];

			// Gets Property Value Type
			var Prop_Type			= Lib.Var.TypeOf(Prop_Value);

			// Set PV_ToShow according the case
			var PV_ToShow			= "";
			var BgColor				= "FFFFFF";
			switch (Prop_Type)
				{
				case "undefined":
				case "boolean":
				case "number":
				case "string":
					PV_ToShow		= this.Inspect(Prop_Value);
					break;

				case "function":
					PV_ToShow		= this.Inspect(Prop_Value);
					BgColor			= "#E0E0E0";
					break;

				case "null":
				case "date":
				case "array":
					PV_ToShow		= this.Inspect(Prop_Value);
					break;

				case "object":
					// XPTO - Reenter Level ?
					PV_ToShow		= this.Inspect(Prop_Value);
					break;

				case "olnydump":
					PV_ToShow		= this.Inspect(Prop_Value);
					break;

				default:
					Lib.FatalErrorMNO("Lib.Inspect", "Unknown Prop_Type.", "Prop_Name = \"" + Prop_Name + "\"", "Prop_Value = " + Prop_Value, "Prop_Type = \"" + Prop_Type + "\"");
				}

			// NeedToShow ?
			//if (NeedToShow)
			//	{
				if (Prop_Type == "array")
					{
					Prop_Type	   += " [" + Prop_Value.length + "]";
					}
				if (Prop_Type == "olnydump")
					{
					Prop_Type		= "object<br>(olny dump)";
					}

				ToShow.push			("<tr>");
				ToShow.push			("<td class='TD_HR' bgcolor=" + BgColor + ">" + Props_Count	+ "</td>");
				ToShow.push			("<td class='TD_DL' bgcolor=" + BgColor + ">" + Prop_Name		+ "</td>");
				ToShow.push			("<td class='TD_DL' bgcolor=" + BgColor + ">" + Prop_Type		+ "</td>");
				ToShow.push			("<td class='TD_DL' bgcolor=" + BgColor + ">" + PV_ToShow		+ "</td>");
				ToShow.push			("</tr>");
			//	}

			}	// for (var Prop_Name in Obj)

		// Table end
		ToShow.push					("</table>");

		// Returns
		return ToShow.join("");
		};

	//===========================================================================
	//===========================================================================
	//==
	//== Session Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Session Begin
	//---------------------------------------------------------------------------

	Lib.Session_Begin = function Session_Begin(SoftwarePoint, Msg)
		{
		G.SessionID++;
		//	Lib.DebugLog_Log		(SoftwarePoint + " (session begin)", Msg);
		Lib.DebugLog_Log			(SoftwarePoint, Msg);
		};

	//===========================================================================
	//===========================================================================
	//==
	//== Menu Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Push CSS
	//---------------------------------------------------------------------------

	Lib.Menu_PushCSSToShow = function Menu_PushCSSToShow(ToShow)
		{
		// Font Size
		var FontSize				= "13px";						// Headet

		// Backgroung Colors
		var BgColor_H				= "A0A0A0";						// Headet
		var BgColor_D				= "FFFFFF";						// Data

		// CSS Style Begin
		ToShow.push					("\r\n<style type=\"text/css\">");

		// body
		ToShow.push					("\r\nbody");
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		font-family			: Verdana,Arial;");
		ToShow.push					("\r\n		font-size			: " + FontSize + ";");
		ToShow.push					("\r\n		background-color	: F0F0F0;");
		ToShow.push					("\r\n		}");

		// External Table
		ToShow.push					("\r\n.TB_Ext");
		ToShow.push					("\r\n		{");
		//	ToShow.push				("\r\n		font-family			: Verdana,Arial;");
		ToShow.push					("\r\n		font-size			: " + FontSize + ";");
		ToShow.push					("\r\n		background-color	: 505050;");
		ToShow.push					("\r\n		}");

		// Header TD's
		ToShow.push					("\r\n.TD_HL");					// Header Left
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'left';");
		ToShow.push					("\r\n		background-color	: " + BgColor_H + ";");
		ToShow.push					("\r\n		}");
		ToShow.push					("\r\n.TD_HC");					// Header Center
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'center';");
		ToShow.push					("\r\n		background-color	: " + BgColor_H + ";");
		ToShow.push					("\r\n		}");
		ToShow.push					("\r\n.TD_HR");					// Header Right
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'right';");
		ToShow.push					("\r\n		background-color	: " + BgColor_H + ";");
		ToShow.push					("\r\n		}");

		// Data TD's
		ToShow.push					("\r\n.TD_DL");					// Data Left
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'left';");
		ToShow.push					("\r\n		background-color	: " + BgColor_D + ";");
		ToShow.push					("\r\n		}");
		ToShow.push					("\r\n.TD_DC");					// Data Center
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'center';");
		ToShow.push					("\r\n		background-color	: " + BgColor_D + ";");
		ToShow.push					("\r\n		}");
		ToShow.push					("\r\n.TD_DR");					// Data Right
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-align			: 'right';");
		ToShow.push					("\r\n		background-color	: " + BgColor_D + ";");
		ToShow.push					("\r\n		}");

		// body
		ToShow.push					("\r\.A_Link");
		ToShow.push					("\r\n		{");
		ToShow.push					("\r\n		text-decoration		: none;");
		ToShow.push					("\r\n		}");

		// CSS Style End
		ToShow.push					("\r\n</style>");
		ToShow.push					("\r\n");
		};

	//---------------------------------------------------------------------------
	// Push Menu
	//---------------------------------------------------------------------------

	Lib.Menu_PushToShow = function Menu_PushToShow(ToShow)
		{
		ToShow.push					("<table border=0 class='TB_Ext' cellspacing=1 cellpadding=2>");
		//
		ToShow.push					("<tr><td class='TD_HL'>");
		ToShow.push					("Versao: " + G.VersionToShow);
		ToShow.push					("<br>Clique em uma das opcoes:");
		ToShow.push					("</td></tr>");
		//
		ToShow.push					("<tr><td class='TD_DL'>");
		//
		for (var i = 0; i < G.Opts.length; i++)
			{
			var Opt					= G.Opts[i];
			if (Opt.MethodName == "FacebookLogin")
				Lib.Menu_PushItemToShow	(ToShow, Opt.Caption, "FacebookLogin",	"auth/facebook");
			else
				Lib.Menu_PushItemToShow	(ToShow, Opt.Caption, "",				"ProcessOption?MethodName=" + Opt.MethodName);
			}
		//
		ToShow.push					("</td></tr>");
		//
		ToShow.push					("</table>");
		ToShow.push					("<p>");
		};

	//---------------------------------------------------------------------------
	// Push Menu Item
	//---------------------------------------------------------------------------

	Lib.Menu_PushItemToShow = function Menu_PushItemToShow(ToShow, Caption, Target, HRef)
		{
		//	ToShow.push				("<tr><td class='TD_DL'>");
		var TargetToAdd				= "";
		//	if (Target != "")
		//		TargetToAdd			= " target='" + Target + "' ";
		ToShow.push					("<a class='A_Link' href='" + HRef + "' onmouseover=\"this.style.textDecoration='underline';\"  onmouseout=\"this.style.textDecoration='none';\" " + TargetToAdd + ">" + Caption + "</a>");
		ToShow.push					("<br>");
		//	ToShow.push				("</td></tr>");
		};

	//===========================================================================
	//===========================================================================
	//==
	//== DebugLog Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Push Header
	//---------------------------------------------------------------------------

	Lib.DebugLog_PushHeader = function DebugLog_PushHeader(ToShow)
		{
		ToShow.push					("<tr>");
		//
		ToShow.push					("<td class='TD_HR'>");
		ToShow.push					("#");
		ToShow.push					("</td>");
		//
		ToShow.push					("<td class='TD_HR'>");
		ToShow.push					("Session ID");
		ToShow.push					("</td>");
		//
		ToShow.push					("<td class='TD_HC'>");
		ToShow.push					("Date/Time");
		ToShow.push					("</td>");
		//
		ToShow.push					("<td class='TD_HL'>");
		ToShow.push					("SoftwarePoint");
		ToShow.push					("</td>");
		//
		ToShow.push					("<td class='TD_HL'>");
		ToShow.push					("Msg");
		ToShow.push					("</td>");
		//
		ToShow.push					("</tr>");
		};

	//---------------------------------------------------------------------------
	// Push DebugLog
	//---------------------------------------------------------------------------

	Lib.DebugLog_PushToShow = function DebugLog_PushToShow(ToShow)
		{
		if (G.DebugLogs.length == 0)
			{
			ToShow.push				("Nao existem Logs.");
			return;
			}

		// Table Begin
		ToShow.push					("<p>");
		ToShow.push					("<table border=0 class='TB_Ext' cellspacing=1 cellpadding=2>");

		// Push Header
		Lib.DebugLog_PushHeader		(ToShow);

		// Push Logs
		//	for (var i = (G.DebugLogs.length - 1); i >= 0 ; i--)
		for (var i = 0; i < G.DebugLogs.length; i++)
			{
			var Log					= G.DebugLogs[i];
			ToShow.push				("<tr>");
			//
			ToShow.push				("<td class='TD_HR'>");
			ToShow.push				(i + 1);
			ToShow.push				("</td>");

			//
			ToShow.push				("<td class='TD_DR'>");
			ToShow.push				("<b>");
			ToShow.push				(Log.SessionID);
			ToShow.push				("</b>");
			ToShow.push				("</td>");
			//
			ToShow.push				("<td class='TD_DC'>");
			ToShow.push				(Log.DateTime.ToStr());
			ToShow.push				("</td>");
			//
			ToShow.push				("<td class='TD_DL'>");
			ToShow.push				(Log.SoftwarePoint);
			ToShow.push				("</td>");
			//
			ToShow.push				("<td class='TD_DL'>");
			ToShow.push				(Log.Msg);
			ToShow.push				("</td>");
			//
			ToShow.push				("</tr>");
			}

		// Push Header
		Lib.DebugLog_PushHeader		(ToShow);

		// Table End
		ToShow.push					("</table>");
		};

	//---------------------------------------------------------------------------
	// Lib.DebugLog_Log
	//---------------------------------------------------------------------------

	Lib.DebugLog_Log = function DebugLog_Log(SoftwarePoint, Msg)
		{
		// Creates
		var Log						= {};
		Log.SessionID				= G.SessionID;
		Log.DateTime				= new Date();
		Log.SoftwarePoint			= SoftwarePoint;
		Log.Msg						= Msg;

		// Store
		G.DebugLogs.push			(Log);
		};

//###########################################################################
//###########################################################################
