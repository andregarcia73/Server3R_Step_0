//###########################################################################
//###########################################################################
//##
//## Facebook Messenger Bot - Intelligence
//## 14/11/19
//##
//###########################################################################
//###########################################################################

	//---------------------------------------------------------------------------
	// Global Vars
	//---------------------------------------------------------------------------

		// Array of I/Os
		var G_IOsTable				= [];
		var G_ShowConvInput			= ! false;
		//	var G_ShowConvInput		=   false;																		// TO_BE_CLEANED_IN_FINAL_VERSION

	//===========================================================================
	//===========================================================================
	//==
	//== Configuration Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Build I/Os Table
	//---------------------------------------------------------------------------

	function BuildIOsTable()
		{
		// Already Stored
		if (Lib.Stored_G_IOsTable)
			{
			G_IOsTable				= Lib.Stored_G_IOsTable;
			return;
			}

		// Reset Array of I/Os
		G_IOsTable					= [];

		// Adds I/O itemn in I/Os Table																				// TO_BE_CLEANED_IN_FINAL_VERSION
		//	var Test				= "";																			// TO_BE_CLEANED_IN_FINAL_VERSION
		//	for (var i = 1; i < 255; i++)																			// TO_BE_CLEANED_IN_FINAL_VERSION
		//		Test			   += String.fromCharCode(i);														// TO_BE_CLEANED_IN_FINAL_VERSION

		var fs						= require('fs');
		var FileContent				= fs.readFileSync("./BotDataBase.txt") + "";
		var StrValue				= FileContent;

		var StrPattern				= "([^\r\n\t]+)\t([^\r\n\t]+)";
		var Pattern					= new RegExp(StrPattern, "gi");
		var RE						= Pattern.exec(StrValue);
		while (RE != null)
			{
			var Pergunta			= "" + RegExp.$1;
			var Resposta			= "" + RegExp.$2;
			StrValue				= "" + RegExp.rightContext;
			//	Lib.DebugLog_Log	("BuildIOsTable", "AddIOItem(\"" + Pergunta + "\", \"" + Resposta + "\")");		// TO_BE_CLEANED_IN_FINAL_VERSION
			AddIOItem				(Pergunta, Resposta);

			// Runs again on right context
			Pattern					= new RegExp(StrPattern, "gi");
			RE						= Pattern.exec(StrValue);
			}
		//	Lib.DebugLog_Log		("BuildIOsTable", "G_IOsTable.length = " + G_IOsTable.length);					// TO_BE_CLEANED_IN_FINAL_VERSION

		// Store
		Lib.Stored_G_IOsTable		= G_IOsTable;
		};

	//---------------------------------------------------------------------------
	// Convert an Input
	//---------------------------------------------------------------------------

	function GetConvInput(StrInput)
		{
		//	return StrInput;
		return prepara(StrInput);
		};

	//---------------------------------------------------------------------------
	// Adds I/O item in I/Os Table
	//---------------------------------------------------------------------------

	function AddIOItem(IOItem_Input, IOItem_Output)
		{
		// Creates I/O Item Objetct
		var IOItem					= {};

		// Defines I/O Item properties
		IOItem.Index				= G_IOsTable.length;
		IOItem.MatchValue			= 0;							// MatchValue (0 (none) to 1 (exact))
		IOItem.Input				= IOItem_Input;
		IOItem.Output				= IOItem_Output;

		IOItem.ConvInput			= GetConvInput(IOItem_Input);
		//	IOItem.ConvInput		= GetConvInput(IOItem_Input + " " + IOItem_Output);		// Optional search on answers too

		// Stores
		G_IOsTable.push				(IOItem);
		};

	//---------------------------------------------------------------------------
	// CutAccents
	//---------------------------------------------------------------------------

	function CutAccents(I)
		{
		//	return I;
		return I

			.replace(/\x00/g,		" ")		// 00 000	---	--
			.replace(/\x01/g,		" ")		// 01 001	SOH	^A
			.replace(/\x02/g,		" ")		// 02 002	STX	^B
			.replace(/\x03/g,		" ")		// 03 003	ETX	^C
			.replace(/\x04/g,		" ")		// 04 004	EOT	^D
			.replace(/\x05/g,		" ")		// 05 005	ENQ	^E
			.replace(/\x06/g,		" ")		// 06 006	ACK	^F
			.replace(/\x07/g,		" ")		// 07 007	BEL	^G
			.replace(/\x08/g,		" ")		// 08 008	BS	^H
			.replace(/\x09/g,		" ")		// 09 009	HT	^I
			.replace(/\x0A/g,		" ")		// 0A 010	LF	^J
			.replace(/\x0B/g,		" ")		// 0B 011	VT	^K
			.replace(/\x0C/g,		" ")		// 0C 012	FF	^L
			.replace(/\x0D/g,		" ")		// 0D 013	CR	^M
			.replace(/\x0E/g,		" ")		// 0E 014	SO	^N
			.replace(/\x0F/g,		" ")		// 0F 015	SI	^O

			.replace(/\x10/g,		" ")		// 10 016	DLE	^P
			.replace(/\x11/g,		" ")		// 11 017	DC1	^Q
			.replace(/\x12/g,		" ")		// 12 018	DC2	^R
			.replace(/\x13/g,		" ")		// 13 019	DC3	^S
			.replace(/\x14/g,		" ")		// 14 020	DC4	^T
			.replace(/\x15/g,		" ")		// 15 021	NAK	^U
			.replace(/\x16/g,		" ")		// 16 022	SYN	^V
			.replace(/\x17/g,		" ")		// 17 023	ETB	^W
			.replace(/\x18/g,		" ")		// 18 024	CAN	^X
			.replace(/\x19/g,		" ")		// 19 025	EM	^Y
			.replace(/\x1A/g,		" ")		// 1A 026	SUB	^Z
			.replace(/\x1B/g,		" ")		// 1B 027	ESC	^[
			.replace(/\x1C/g,		" ")		// 1C 028	FS	^\
			.replace(/\x1D/g,		" ")		// 1D 029	GS	^]
			.replace(/\x1E/g,		" ")		// 1E 030	RS	^^
			.replace(/\x1F/g,		" ")		// 1F 031	US	^_

		//	.replace(/\x20/g,		"_")		// 20 032	SP
			.replace(/\x21/g,		" ")		// 21 033	!
			.replace(/\x22/g,		" ")		// 22 034	"	quotation mark = APL quote
			.replace(/\x23/g,		" ")		// 23 035	#
			.replace(/\x24/g,		" ")		// 24 036	$
			.replace(/\x25/g,		" ")		// 25 037	%
			.replace(/\x26/g,		" ")		// 26 038	&	ampersand
			.replace(/\x27/g,		" ")		// 27 039	'
			.replace(/\x28/g,		" ")		// 28 040	(
			.replace(/\x29/g,		" ")		// 29 041	)
			.replace(/\x2A/g,		" ")		// 2A 042	*
			.replace(/\x2B/g,		" ")		// 2B 043	+
			.replace(/\x2C/g,		" ")		// 2C 044	,
			.replace(/\x2D/g,		" ")		// 2D 045	-
			.replace(/\x2E/g,		" ")		// 2E 046	.
			.replace(/\x2F/g,		" ")		// 2F 047	/

		//	.replace(/\x30/g,		"_")		// 30 048	0
		//	.replace(/\x31/g,		"_")		// 31 049	1
		//	.replace(/\x32/g,		"_")		// 32 050	2
		//	.replace(/\x33/g,		"_")		// 33 051	3
		//	.replace(/\x34/g,		"_")		// 34 052	4
		//	.replace(/\x35/g,		"_")		// 35 053	5
		//	.replace(/\x36/g,		"_")		// 36 054	6
		//	.replace(/\x37/g,		"_")		// 37 055	7
		//	.replace(/\x38/g,		"_")		// 38 056	8
		//	.replace(/\x39/g,		"_")		// 39 057	9
			.replace(/\x3A/g,		" ")		// 3A 058	:
			.replace(/\x3B/g,		" ")		// 3B 059	;
			.replace(/\x3C/g,		" ")		// 3C 060	<	less-than sign
			.replace(/\x3D/g,		" ")		// 3D 061	=
			.replace(/\x3E/g,		" ")		// 3E 062	>	greater-than sign
			.replace(/\x3F/g,		" ")		// 3F 063	?

			.replace(/\x40/g,		" ")		// 40 064	@
		//	.replace(/\x41/g,		"a")		// 41 065	A
		//	.replace(/\x42/g,		"b")		// 42 066	B
		//	.replace(/\x43/g,		"c")		// 43 067	C
		//	.replace(/\x44/g,		"d")		// 44 068	D
		//	.replace(/\x45/g,		"e")		// 45 069	E
		//	.replace(/\x46/g,		"f")		// 46 070	F
		//	.replace(/\x47/g,		"g")		// 47 071	G
		//	.replace(/\x48/g,		"h")		// 48 072	H
		//	.replace(/\x49/g,		"i")		// 49 073	I
		//	.replace(/\x4A/g,		"j")		// 4A 074	J
		//	.replace(/\x4B/g,		"k")		// 4B 075	K
		//	.replace(/\x4C/g,		"l")		// 4C 076	L
		//	.replace(/\x4D/g,		"m")		// 4D 077	M
		//	.replace(/\x4E/g,		"n")		// 4E 078	N
		//	.replace(/\x4F/g,		"o")		// 4F 079	O

		//	.replace(/\x50/g,		"p")		// 50 080	P
		//	.replace(/\x51/g,		"q")		// 51 081	Q
		//	.replace(/\x52/g,		"r")		// 52 082	R
		//	.replace(/\x53/g,		"s")		// 53 083	S
		//	.replace(/\x54/g,		"t")		// 54 084	T
		//	.replace(/\x55/g,		"u")		// 55 085	U
		//	.replace(/\x56/g,		"v")		// 56 086	V
		//	.replace(/\x57/g,		"w")		// 57 087	W
		//	.replace(/\x58/g,		"x")		// 58 088	X
		//	.replace(/\x59/g,		"y")		// 59 089	Y
		//	.replace(/\x5A/g,		"z")		// 5A 090	Z
			.replace(/\x5B/g,		" ")		// 5B 091	[
			.replace(/\x5C/g,		" ")		// 5C 092	\
			.replace(/\x5D/g,		" ")		// 5D 093	]
			.replace(/\x5E/g,		" ")		// 5E 094	^
			.replace(/\x5F/g,		" ")		// 5F 095	_

			.replace(/\x60/g,		" ")		// 60 096	`
		//	.replace(/\x61/g,		"_")		// 61 097	a
		//	.replace(/\x62/g,		"_")		// 62 098	b
		//	.replace(/\x63/g,		"_")		// 63 099	c
		//	.replace(/\x64/g,		"_")		// 64 100	d
		//	.replace(/\x65/g,		"_")		// 65 101	e
		//	.replace(/\x66/g,		"_")		// 66 102	f
		//	.replace(/\x67/g,		"_")		// 67 103	g
		//	.replace(/\x68/g,		"_")		// 68 104	h
		//	.replace(/\x69/g,		"_")		// 69 105	i
		//	.replace(/\x6A/g,		"_")		// 6A 106	j
		//	.replace(/\x6B/g,		"_")		// 6B 107	k
		//	.replace(/\x6C/g,		"_")		// 6C 108	l
		//	.replace(/\x6D/g,		"_")		// 6D 109	m
		//	.replace(/\x6E/g,		"_")		// 6E 110	n
		//	.replace(/\x6F/g,		"_")		// 6F 111	o

		//	.replace(/\x70/g,		"_")		// 70 112	p
		//	.replace(/\x71/g,		"_")		// 71 113	q
		//	.replace(/\x72/g,		"_")		// 72 114	r
		//	.replace(/\x73/g,		"_")		// 73 115	s
		//	.replace(/\x74/g,		"_")		// 74 116	t
		//	.replace(/\x75/g,		"_")		// 75 117	u
		//	.replace(/\x76/g,		"_")		// 76 118	v
		//	.replace(/\x77/g,		"_")		// 77 119	w
		//	.replace(/\x78/g,		"_")		// 78 120	x
		//	.replace(/\x79/g,		"_")		// 79 121	y
		//	.replace(/\x7A/g,		"_")		// 7A 122	z
			.replace(/\x7B/g,		" ")		// 7B 123	{
			.replace(/\x7C/g,		" ")		// 7C 124	|
			.replace(/\x7D/g,		" ")		// 7D 125	}
			.replace(/\x7E/g,		" ")		// 7E 126	~
			.replace(/\x7F/g,		" ")		// 7F 127	---	NÃO É ANSI

			.replace(/\x80/g,		" ")		// 80 128	€
			.replace(/\x81/g,		" ")		// 81 129	---
			.replace(/\x82/g,		" ")		// 82 130	‚
			.replace(/\x83/g,		" ")		// 83 131	ƒ
			.replace(/\x84/g,		" ")		// 84 132	„
			.replace(/\x85/g,		" ")		// 85 133	…
			.replace(/\x86/g,		" ")		// 86 134	†
			.replace(/\x87/g,		" ")		// 87 135	‡
			.replace(/\x88/g,		" ")		// 88 136	ˆ
			.replace(/\x89/g,		" ")		// 89 137	‰
			.replace(/\x8A/g,		" ")		// 8A 138	Š
			.replace(/\x8B/g,		" ")		// 8B 139	‹
			.replace(/\x8C/g,		" ")		// 8C 140	Œ
			.replace(/\x8D/g,		" ")		// 8D 141	---
			.replace(/\x8E/g,		" ")		// 8E 142	---
			.replace(/\x8F/g,		" ")		// 8F 143	---

			.replace(/\x90/g,		" ")		// 90 144	---
			.replace(/\x91/g,		" ")		// 91 145	‘	É ANSI
			.replace(/\x92/g,		" ")		// 92 146	’	É ANSI
			.replace(/\x93/g,		" ")		// 93 147	“
			.replace(/\x94/g,		" ")		// 94 148	”
			.replace(/\x95/g,		" ")		// 95 149	•
			.replace(/\x96/g,		" ")		// 96 150	–
			.replace(/\x97/g,		" ")		// 97 151	—
			.replace(/\x98/g,		" ")		// 98 152	˜
			.replace(/\x99/g,		" ")		// 99 153	™
			.replace(/\x9A/g,		" ")		// 9A 154	š
			.replace(/\x9B/g,		" ")		// 9B 155	›
			.replace(/\x9C/g,		" ")		// 9C 156	œ
			.replace(/\x9D/g,		" ")		// 9D 157	---
			.replace(/\x9E/g,		" ")		// 9E 158	---
			.replace(/\x9F/g,		" ")		// 9F 159	Ÿ	&Yuml;

			.replace(/\xA0/g,		" ")		// A0 160 		NÃO É ANSI no-break space = non-breaking space
			.replace(/\xA1/g,		" ")		// A1 161	¡	inverted exclamation mark
			.replace(/\xA2/g,		" ")		// A2 162	¢	cent sign
			.replace(/\xA3/g,		" ")		// A3 163	£	pound sign
			.replace(/\xA4/g,		" ")		// A4 164	¤	currency sign
			.replace(/\xA5/g,		" ")		// A5 165	¥	yen sign = yuan sign
			.replace(/\xA6/g,		" ")		// A6 166	¦	broken bar = broken vertical bar
			.replace(/\xA7/g,		" ")		// A7 167	§	section sign
			.replace(/\xA8/g,		" ")		// A8 168	¨	diaeresis = spacing diaeresis
			.replace(/\xA9/g,		" ")		// A9 169	©	copyright sign
			.replace(/\xAA/g,		" ")		// AA 170	ª	feminine ordinal indicator
			.replace(/\xAB/g,		" ")		// AB 171	«	left-pointing double angle quotation mark = left pointing guillemet
			.replace(/\xAC/g,		" ")		// AC 172	¬	not sign = discretionary hyphen
			.replace(/\xAD/g,		" ")		// AD 173	­	soft hyphen = discretionary hyphen
			.replace(/\xAE/g,		" ")		// AE 174	®	registered sign = registered trade mark sign
			.replace(/\xAF/g,		" ")		// AF 175	¯	macron = spacing macron = overline = APL overbar

			.replace(/\xB0/g,		" ")		// B0 176	°	degree sign
			.replace(/\xB1/g,		" ")		// B1 177	±	plus-minus sign = plus-or-minus sign
			.replace(/\xB2/g,		" ")		// B2 178	²	superscript two = superscript digit two = squared
			.replace(/\xB3/g,		" ")		// B3 179	³	superscript three = superscript digit three = cubed
			.replace(/\xB4/g,		" ")		// B4 180	´	acute accent = spacing acute
			.replace(/\xB5/g,		" ")		// B5 181	µ	micro sign
			.replace(/\xB6/g,		" ")		// B6 182	¶	pilcrow sign = paragraph sign
			.replace(/\xB7/g,		" ")		// B7 183	·	middle dot = Georgian comma = Greek middle dot
			.replace(/\xB8/g,		" ")		// B8 184	¸	cedilla = spacing cedilla
			.replace(/\xB9/g,		" ")		// B9 185	¹	superscript one = superscript digit one
			.replace(/\xBA/g,		" ")		// BA 186	º	masculine ordinal indicator
			.replace(/\xBB/g,		" ")		// BB 187	»	right-pointing double angle quotation mark = right pointing guillemet
			.replace(/\xBC/g,		" ")		// BC 188	¼	vulgar fraction one quarter = fraction one quarter
			.replace(/\xBD/g,		" ")		// BD 189	½	vulgar fraction one half = fraction one half
			.replace(/\xBE/g,		" ")		// BE 190	¾	vulgar fraction three quarters = fraction three quarters
			.replace(/\xBF/g,		" ")		// BF 191	¿	inverted question mark = turned question mark

			.replace(/\xC0/g,		"a")		// C0 192	À	Latin capital letter A with grave = Latin capital letter A grave
			.replace(/\xC1/g,		"a")		// C1 193	Á	Latin capital letter A with acute
			.replace(/\xC2/g,		"a")		// C2 194	Â	Latin capital letter A with circumflex
			.replace(/\xC3/g,		"a")		// C3 195	Ã	Latin capital letter A with tilde
			.replace(/\xC4/g,		"a")		// C4 196	Ä	Latin capital letter A with diaeresis
			.replace(/\xC5/g,		"a")		// C5 197	Å	Latin capital letter A with ring above = Latin capital letter A ring
			.replace(/\xC6/g,		" ")		// C6 198	Æ	Latin capital letter AE = Latin capital ligature AE
			.replace(/\xC7/g,		"c")		// C7 199	Ç	Latin capital letter C with cedilla
			.replace(/\xC8/g,		"e")		// C8 200	È	Latin capital letter E with grave
			.replace(/\xC9/g,		"e")		// C9 201	É	Latin capital letter E with acute
			.replace(/\xCA/g,		"e")		// CA 202	Ê	Latin capital letter E with circumflex
			.replace(/\xCB/g,		"e")		// CB 203	Ë	Latin capital letter E with diaeresis
			.replace(/\xCC/g,		"i")		// CC 204	Ì	Latin capital letter I with grave
			.replace(/\xCD/g,		"i")		// CD 205	Í	Latin capital letter I with acute
			.replace(/\xCE/g,		"i")		// CE 206	Î	Latin capital letter I with circumflex
			.replace(/\xCF/g,		"i")		// CF 207	Ï	Latin capital letter I with diaeresis

			.replace(/\xD0/g,		" ")		// D0 208	Ð	Latin capital letter ETH
			.replace(/\xD1/g,		"n")		// D1 209	Ñ	Latin capital letter N with tilde
			.replace(/\xD2/g,		"o")		// D2 210	Ò	Latin capital letter O with grave
			.replace(/\xD3/g,		"o")		// D3 211	Ó	Latin capital letter O with acute
			.replace(/\xD4/g,		"o")		// D4 212	Ô	Latin capital letter O with circumflex
			.replace(/\xD5/g,		"o")		// D5 213	Õ	Latin capital letter O with tilde
			.replace(/\xD6/g,		"o")		// D6 214	Ö	Latin capital letter O with diaeresis
			.replace(/\xD7/g,		" ")		// D7 215	×	multiplication sign
			.replace(/\xD8/g,		" ")		// D8 216	Ø	Latin capital letter O with stroke = Latin capital letter O slash
			.replace(/\xD9/g,		"u")		// D9 217	Ù	Latin capital letter U with grave
			.replace(/\xDA/g,		"u")		// DA 218	Ú	Latin capital letter U with acute
			.replace(/\xDB/g,		"u")		// DB 219	Û	Latin capital letter U with circumflex
			.replace(/\xDC/g,		"u")		// DC 220	Ü	Latin capital letter U with diaeresis
			.replace(/\xDD/g,		" ")		// DD 221	Ý	Latin capital letter Y with acute
			.replace(/\xDE/g,		" ")		// DE 222	Þ	Latin capital letter THORN
			.replace(/\xDF/g,		" ")		// DF 223	ß	Latin small letter sharp s = ess-zed

			.replace(/\xE0/g,		"a")		// E0 224	à	Latin small letter a with grave = Latin small letter a grave
			.replace(/\xE1/g,		"a")		// E1 225	á	Latin small letter a with acute
			.replace(/\xE2/g,		"a")		// E2 226	â	Latin small letter a with circumflex
			.replace(/\xE3/g,		"a")		// E3 227	ã	Latin small letter a with tilde
			.replace(/\xE4/g,		"a")		// E4 228	ä	Latin small letter a with diaeresis
			.replace(/\xE5/g,		"a")		// E5 229	å	Latin small letter a with ring above = Latin small letter a ring
			.replace(/\xE6/g,		" ")		// E6 230	æ	Latin small letter ae = Latin small ligature ae
			.replace(/\xE7/g,		"c")		// E7 231	ç	Latin small letter c with cedilla
			.replace(/\xE8/g,		"e")		// E8 232	è	Latin small letter e with grave
			.replace(/\xE9/g,		"e")		// E9 233	é	Latin small letter e with acute
			.replace(/\xEA/g,		"e")		// EA 234	ê	Latin small letter e with circumflex
			.replace(/\xEB/g,		"e")		// EB 235	ë	Latin small letter e with diaeresis
			.replace(/\xEC/g,		"i")		// EC 236	ì	Latin small letter i with grave
			.replace(/\xED/g,		"i")		// ED 237	í	Latin small letter i with acute
			.replace(/\xEE/g,		"i")		// EE 238	î	Latin small letter i with circumflex
			.replace(/\xEF/g,		"i")		// EF 239	ï	Latin small letter i with diaeresis

			.replace(/\xF0/g,		" ")		// F0 240	ð	Latin small letter eth
			.replace(/\xF1/g,		"n")		// F1 241	ñ	Latin small letter n with tilde
			.replace(/\xF2/g,		"o")		// F2 242	ò	Latin small letter o with grave
			.replace(/\xF3/g,		"o")		// F3 243	ó	Latin small letter o with acute
			.replace(/\xF4/g,		"o")		// F4 244	ô	Latin small letter o with circumflex
			.replace(/\xF5/g,		"o")		// F5 245	õ	Latin small letter o with tilde
			.replace(/\xF6/g,		"o")		// F6 246	ö	Latin small letter o with diaeresis
			.replace(/\xF7/g,		" ")		// F7 247	÷	division sign
			.replace(/\xF8/g,		" ")		// F8 248	ø	Latin small letter o with stroke = Latin small letter o slash
			.replace(/\xF9/g,		"u")		// F9 249	ù	Latin small letter u with grave
			.replace(/\xFA/g,		"u")		// FA 250	ú	Latin small letter u with acute
			.replace(/\xFB/g,		"u")		// FB 251	û	Latin small letter u with circumflex
			.replace(/\xFC/g,		"u")		// FC 252	ü	Latin small letter u with diaeresis
			.replace(/\xFD/g,		"y")		// FD 253	ý	Latin small letter y with acute
			.replace(/\xFE/g,		" ")		// FE 254	þ	Latin small letter thorn
			.replace(/\xFF/g,		" ")		// FF 255	ÿ	Latin small letter y with diaeresis
			;
		};

	//---------------------------------------------------------------------------
	// ConvertToSoundexOne
	//---------------------------------------------------------------------------

	function ConvertToSoundexOne(I)
		{
		//	return I.charAt(0).toUpperCase();	// CURIOSA PESQUISA SÓ VALEM AS 1as Letras
		//	return I;							// Pesquisa EXATA

		//---------------------------------------------------------------------------
		// https://en.wikipedia.org/wiki/Soundex
		//		1. Retain the first letter of the name and drop all other occurrences of a, e, i, o, u, y, h, w.
		//		2. Replace consonants with digits as follows (after the first letter):
		//			1:	b, f, p, v
		//			2:	c, g, j, k, q, s, x, z
		//			3:	d, t
		//			4:	l
		//			5:	m, n
		//			6:	r
		//		3. If two or more letters with the same number are adjacent in the original name (before step 1),
		//				only retain the first letter; also two letters with the same number separated by 'h' or 'w' are
		//				coded as a single number, whereas such letters separated by a vowel are coded twice.
		//				This rule also applies to the first letter.
		//		3.	If you have too few letters in your word that you can't assign three numbers, append with
		//			zeros until there are three numbers. If you have more than 3 letters, just retain the first 3 numbers.
		//---------------------------------------------------------------------------

		var UseZero					=   false;
		//	var UseZero				= ! false;
		var Offset					= 0;
		var R						= [];
		var C;
		for (var i = 0; i < I.length; i++)
			{
			C						= I.charAt(i);
			if (i == 0)
				{
				R.push				(C.toUpperCase())
				continue;
				}
			switch (C)
				{
				case "a":
				case "e":
				case "i":
				case "o":
				case "u":
				case "y":
				case "h":
				case "w":
					if (UseZero)
						R.push		("0");
					break;

				case "b":
				case "f":
				case "p":
				case "v":
					R.push			("1");
					break;

				case "c":
				case "g":
				case "j":
				case "k":
				case "q":
				case "s":
				case "x":
				case "z":
					R.push			("2");
					break;

				case "d":
				case "t":
					R.push			("3");
					break;

				case "l":
					R.push			("4");
					break;

				case "m":
				case "n":
					R.push			("5");
					break;

				case "r":
					R.push			("6");
					break;
				}
			}
		return R.join("");
		};

	//---------------------------------------------------------------------------
	// ConvertToSoundex
	//---------------------------------------------------------------------------

	function ConvertToSoundex(I)
		{
		//	return I;
		var ObjArr					= GetObjArr(I);
		var Result					= [];
		for (var i = 0; i < ObjArr.length; i++)
			{
			//	Result.push			("[" +	ObjArr[i].Value + "]"						);
			//	Result.push			("[" +	ConvertToSoundexOne(ObjArr[i].Value) + "]"	);
			Result.push				(		ConvertToSoundexOne(ObjArr[i].Value)		);
			}
		return Result.join(" ");
		};

	//---------------------------------------------------------------------------
	// prepara
	//---------------------------------------------------------------------------

	function prepara(I)
		{
		//	$str					= strtolower( $str );
		//	$str					= preg_replace( "/(?![.=$'€%-])\p{P}/u", "", $str ); //remove pontuação
		//	$str					= strtr(utf8_decode( $str ), utf8_decode( 'àáâãäçèéêëìíîïñòóôõöùúûüýÿ' ), 'aaaaaceeeeiiiinooooouuuuyy' ); //remove acentos
		//	return $str;
		I							= I.toLowerCase();
		I							= CutAccents		(I);
		I							= ConvertToSoundex	(I);
		return I;
		};

	//---------------------------------------------------------------------------
	// prepara
	//---------------------------------------------------------------------------
	//
	//function prepara(I)
	//	{
	//	//	$str					= strtolower( $str );
	//	//	$str					= preg_replace( "/(?![.=$'€%-])\p{P}/u", "", $str ); //remove pontuação
	//	//	$str					= strtr(utf8_decode( $str ), utf8_decode( 'àáâãäçèéêëìíîïñòóôõöùúûüýÿ' ), 'aaaaaceeeeiiiinooooouuuuyy' ); //remove acentos
	//	//	return $str;
	//	return I;
	//	};

	//===========================================================================
	//===========================================================================
	//==
	//== Show Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Show I/Os Table
	//---------------------------------------------------------------------------

	function ShowIOsTable()
		{
		// Builds

		// Table begin
		var Result				= [];
		Result.push				("<table border=1 style='width:100%;'>");

		// Row begin
		Result.push				("<tr>");

		Result.push				("<td style='text-align:right;'>");
		Result.push				("Index");
		Result.push				("</td>");

		Result.push				("<td style='text-align:right;'>");
		Result.push				("MatchValue");
		Result.push				("</td>");

		Result.push				("<td>");
		Result.push				("Input");
		Result.push				("</td>");

		if (G_ShowConvInput)
			{
			Result.push			("<td>");
			Result.push			("Conv Input");
			Result.push			("</td>");
			}

		Result.push				("<td>");
		Result.push				("Output");
		Result.push				("</td>");

		// Row end
		Result.push				("</tr>");

		// Table rows
		for (var i = 0; i < G_IOsTable.length; i++)
			{
			var IOItem			= G_IOsTable[i];

			// Row begin
			Result.push			("<tr>");

			Result.push			("<td style='text-align:right;'>");
			Result.push			(IOItem.Index + 1);
			Result.push			("</td>");

			Result.push			("<td style='text-align:right;'>");
			Result.push			(IOItem.MatchValue);
			Result.push			("</td>");

			Result.push			("<td>");
			Result.push			(IOItem.Input);
			Result.push			("</td>");

			if (G_ShowConvInput)
				{
				Result.push		("<td>");
				Result.push		(IOItem.ConvInput);
				Result.push		("</td>");
				}

			Result.push			("<td>");
			Result.push			(IOItem.Output);
			Result.push			("</td>");

			// Row end
			Result.push			("</tr>");
			}

		// Table end
		Result.push				("</table>");

		// Show
		var TDToShow			= document.getElementById("TD_Result");
		TDToShow.innerHTML		= Result.join("");
		};

	//===========================================================================
	//===========================================================================
	//==
	//== Event Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Evento OnKeyUp
	//---------------------------------------------------------------------------

	function Input_OnKeyUp()
		{
		//	alert					("Input_OnKeyUp");
		ProcessAll					();
		};

	//===========================================================================
	//===========================================================================
	//==
	//== Intelligence Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// FindObjArr
	//---------------------------------------------------------------------------

	function FindObjArr(Arr, PieceStrValue)
		{
		// Search
		for (var i = 0; i < Arr.length; i++)
			{
			var Obj					= Arr[i];
			if (Obj.Value == PieceStrValue)
				return Obj;			// Found !
			}
		// Not found
		return null;
		};

	//---------------------------------------------------------------------------
	// PushObjArr
	//---------------------------------------------------------------------------

	function PushObjArr(Arr, PieceStrValue)
		{
		// Search
		var Obj						= FindObjArr(Arr, PieceStrValue);

		// Found ?
		if (Obj != null)
			{
			Obj.Count++;
			return;
			}

		// Not found
		var Obj						= {};
		Obj.Value					= PieceStrValue;
		Obj.Count					= 1;
		Arr.push					(Obj);
		};

	//---------------------------------------------------------------------------
	// GetObjArr
	//---------------------------------------------------------------------------

	function GetObjArr(StrValue)
		{
		// Creates
		var Arr						= [];

		// Execs
		var StrPattern				= "[a-zA-Z0-9]+";
		var Pattern					= new RegExp(StrPattern, "gi");
		var RE						= Pattern.exec(StrValue);
		while (RE != null)
			{
			// Store (or Increase)
			PushObjArr				(Arr, RE + "");					// RE + "" is to convert object into string
			//	Arr.push			(RE);
			//	Arr.push			(RegExp.rightContext);

			// Runs again on right context
			StrValue				= RegExp.rightContext;
			Pattern					= new RegExp(StrPattern, "gi");
			RE						= Pattern.exec(StrValue);
			}

		// Returns
		return Arr;
		};

	//---------------------------------------------------------------------------
	// similaridadeCosine
	//---------------------------------------------------------------------------

	function similaridadeCosine(A, B)
		{
		//	alert					("similaridadeCosine(" + A + ", " + B + ")");

		// Thanks to: http://sandbox.onlinephpfunctions.com/

		//¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
		// Original code
		//	$A						= prepara( $A ); //remove pontuação e acentos
		//	$B						= prepara( $B ); //remove pontuação e acentos
		//	$A						= preg_split( '/[\pZ\pC]+/u', $A , null, PREG_SPLIT_NO_EMPTY ); //cria o token
		//	$B						= preg_split( '/[\pZ\pC]+/u', $B , null, PREG_SPLIT_NO_EMPTY ); //cria o token
		//
		//	if ( is_int( key( $A ) ) )
		//		{
		//		$v1					= array_count_values( $A );
		//		}
		//	else
		//		{
		//		$v1					= &$A;
		//		}
		//
		//	if ( is_int( key( $B ) ) )
		//		{
		//		$v2					= array_count_values( $B );
		//		}
		//	else
		//		{
		//		$v2					= &$B;
		//		}
		//
		//	$prod					= 0.0;
		//	$v1_norm				= 0.0;
		//	foreach ( $v1 as $i=>$xi )
		//		{
		//		if ( isset( $v2[$i] ) )
		//			{
		//			$prod		   += $xi * $v2[$i];
		//			}
		//		$v1_norm		   += $xi * $xi;
		//		}
		//	$v1_norm				= sqrt( $v1_norm );
		//
		//	$v2_norm				= 0.0;
		//	foreach ( $v2 as $i=>$xi )
		//		{
		//		$v2_norm		   += $xi * $xi;
		//		}
		//	$v2_norm				= sqrt( $v2_norm );
		//
		//	if ( $v1_norm * $v2_norm == 0 )
		//		{
		//		return 0;
		//		}
		//	else
		//		{
		//		return $prod / ( $v1_norm * $v2_norm );
		//		}
		//___________________________________________________________________________

		//	$A						= prepara( $A ); //remove pontuação e acentos
		//	$B						= prepara( $B ); //remove pontuação e acentos
		//	A						= prepara(A);
		//	B						= prepara(B);

		//	$A						= preg_split( '/[\pZ\pC]+/u', $A , null, PREG_SPLIT_NO_EMPTY ); //cria o token
		//	$B						= preg_split( '/[\pZ\pC]+/u', $B , null, PREG_SPLIT_NO_EMPTY ); //cria o token
		//	if ( is_int( key( $A ) ) )
		//		{
		//		$v1					= array_count_values( $A );
		//		}
		//	else
		//		{
		//		$v1					= &$A;
		//		}
		//
		//	if ( is_int( key( $B ) ) )
		//		{
		//		$v2					= array_count_values( $B );
		//		}
		//	else
		//		{
		//		$v2					= &$B;
		//		}
		var Arr_A					= GetObjArr(A);
		var Arr_B					= GetObjArr(B);
		if (Arr_A.length == 0)
			return 0;
		if (Arr_B.length == 0)
			return 0;

		//	$prod					= 0.0;
		//	$v1_norm				= 0.0;
		//	foreach ( $v1 as $i=>$xi )
		//		{
		//		//	$i is each distinct word
		//		//	$xi is how many times word occurs
		//		if ( isset( $v2[$i] ) )
		//			{
		//			$prod		   += $xi * $v2[$i];
		//			}
		//		$v1_norm		   += $xi * $xi;
		//		}
		//	$v1_norm				= sqrt( $v1_norm );
		var Prod					= 0;
		var V1_norm					= 0;
		for (var i = 0; i < Arr_A.length; i++)
			{
			var Obj_A				= Arr_A[i];
			var Obj_B				= FindObjArr(Arr_B, Obj_A.Value);
			if (Obj_B != null)
				Prod			   += Obj_A.Count * Obj_B.Count;
			V1_norm				   += Obj_A.Count * Obj_A.Count;
			}
		V1_norm						= Math.sqrt(V1_norm);

		//	$v2_norm				= 0.0;
		//	foreach ( $v2 as $i=>$xi )
		//		{
		//		$v2_norm		   += $xi * $xi;
		//		}
		//	$v2_norm				= sqrt( $v2_norm );
		var V2_norm					= 0;
		for (var i = 0; i < Arr_B.length; i++)
			{
			var Obj_B				= Arr_B[i];
			V2_norm				   += Obj_B.Count * Obj_B.Count;
			};
		V2_norm						= Math.sqrt(V2_norm);
		//	return V1_norm + " " + V2_norm;

		//	if ( $v1_norm * $v2_norm == 0 )
		//		{
		//		return 0;
		//		}
		//	else
		//		{
		//		return $prod / ( $v1_norm * $v2_norm );
		//		}
		var Temp					= V1_norm * V2_norm;
		if (Temp == 0)
			return 0;
		return Prod / Temp;
		};

	//---------------------------------------------------------------------------
	// Process All
	//---------------------------------------------------------------------------

	function ProcessAll(InputValue)
		{
		//	// Recover MyInputID Value
		//	var InputValue			= document.getElementById("MyInputID").value;
		//	//	alert				("InputValue = " + InputValue);

		// For debug pourposes
		//G_IOsTable[0].MatchValue	= similaridadeCosine(InputValue, G_IOsTable[0].Input);
		//G_IOsTable[0].MatchValue	= 0.5;
		//	return;

		// Calculates
		for (var i = 0; i < G_IOsTable.length; i++)
			{
			//	G_IOsTable[i].MatchValue= similaridadeCosine(InputValue,				G_IOsTable[i].Input);
			G_IOsTable[i].MatchValue	= similaridadeCosine(GetConvInput(InputValue),	G_IOsTable[i].ConvInput);
			}

		// Sort
		for (var i = 0; i < (G_IOsTable.length - 1); i++)
			{
			for (var j = i + 1; j < G_IOsTable.length; j++)
				{
				var Item_I			= G_IOsTable[i];
				var Item_J			= G_IOsTable[j];
				if (Item_I.MatchValue > Item_J.MatchValue)
					continue;
				if (Item_I.MatchValue == Item_J.MatchValue)
					{
					if (Item_I.Index < Item_J.Index)
						continue;
					}

				// Swap
				var Temp			= G_IOsTable[i];
				G_IOsTable[i]		= G_IOsTable[j];
				G_IOsTable[j]		= Temp;
				}
			}

		// Show I/Os Table
		//	ShowIOsTable			();
		//	alert					("done !");
		};

	//===========================================================================
	//===========================================================================
	//==
	//== Main Methods
	//==
	//===========================================================================
	//===========================================================================

	//---------------------------------------------------------------------------
	// Main Method
	//---------------------------------------------------------------------------

	Lib.ProcessAsk = function ProcessAsk(Ask)
		{
		// Build I/Os Table
		BuildIOsTable				();

		// Process
		ProcessAll					(Ask.AskQuestion)

		// Set
		Ask.Question				= G_IOsTable[0].Input;
		Ask.Answer					= G_IOsTable[0].Output;

		// CutAccents												// TO_BE_CLEANED_IN_FINAL_VERSION
		//	Ask.AskQuestion			= CutAccents(Ask.AskQuestion);	// TO_BE_CLEANED_IN_FINAL_VERSION
		//	Ask.Question			= CutAccents(Ask.Question);		// TO_BE_CLEANED_IN_FINAL_VERSION
		//	Ask.Answer				= CutAccents(Ask.Answer);		// TO_BE_CLEANED_IN_FINAL_VERSION
		};

//###########################################################################
//###########################################################################
