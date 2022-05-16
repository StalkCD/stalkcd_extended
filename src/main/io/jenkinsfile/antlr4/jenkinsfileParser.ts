// Generated from src/main/io/jenkinsfile/antlr4/jenkinsfile.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { jenkinsfileListener } from "./jenkinsfileListener";
import { jenkinsfileVisitor } from "./jenkinsfileVisitor";


export class jenkinsfileParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly DECIMAL_LITERAL = 34;
	public static readonly HEX_LITERAL = 35;
	public static readonly OCT_LITERAL = 36;
	public static readonly BINARY_LITERAL = 37;
	public static readonly FLOAT_LITERAL = 38;
	public static readonly HEX_FLOAT_LITERAL = 39;
	public static readonly BOOL_LITERAL = 40;
	public static readonly NULL_LITERAL = 41;
	public static readonly STRING_LITERAL = 42;
	public static readonly PIPELINE = 43;
	public static readonly STAGES = 44;
	public static readonly PARALLEL = 45;
	public static readonly STAGE = 46;
	public static readonly STEPS = 47;
	public static readonly ENVIRONMENT = 48;
	public static readonly INPUT = 49;
	public static readonly TOOLS = 50;
	public static readonly PARAMETERS = 51;
	public static readonly OPTIONS = 52;
	public static readonly TRIGGERS = 53;
	public static readonly AGENT = 54;
	public static readonly POST = 55;
	public static readonly WHEN = 56;
	public static readonly ANYOF = 57;
	public static readonly ALLOF = 58;
	public static readonly NOT = 59;
	public static readonly EXPRESSION = 60;
	public static readonly FAIL_FAST = 61;
	public static readonly SCRIPT_LITERAL = 62;
	public static readonly DEF_LITERAL = 63;
	public static readonly JENKINSFILE_DECLARATIVE = 64;
	public static readonly LIBRARY_LITERAL = 65;
	public static readonly IMPORT_LITERAL = 66;
	public static readonly LPAREN = 67;
	public static readonly RPAREN = 68;
	public static readonly LBRACE = 69;
	public static readonly RBRACE = 70;
	public static readonly LBRACK = 71;
	public static readonly RBRACK = 72;
	public static readonly COLON = 73;
	public static readonly COMMA = 74;
	public static readonly DOT = 75;
	public static readonly EQUALS = 76;
	public static readonly ASSIGN = 77;
	public static readonly MULTI_COMMENT = 78;
	public static readonly WS = 79;
	public static readonly LINE_COMMENT1 = 80;
	public static readonly LINE_COMMENT2 = 81;
	public static readonly REGEXP_LITERAL = 82;
	public static readonly IDENTIFIER = 83;
	public static readonly RULE_pipeline = 0;
	public static readonly RULE_groovy_definition = 1;
	public static readonly RULE_environment = 2;
	public static readonly RULE_parameters = 3;
	public static readonly RULE_agent = 4;
	public static readonly RULE_agent_section = 5;
	public static readonly RULE_agent_type = 6;
	public static readonly RULE_tools = 7;
	public static readonly RULE_pipeline_options = 8;
	public static readonly RULE_triggers = 9;
	public static readonly RULE_stages = 10;
	public static readonly RULE_stage_definition = 11;
	public static readonly RULE_stage_name = 12;
	public static readonly RULE_fail_fast = 13;
	public static readonly RULE_steps = 14;
	public static readonly RULE_step = 15;
	public static readonly RULE_script = 16;
	public static readonly RULE_input = 17;
	public static readonly RULE_when = 18;
	public static readonly RULE_when_aggregation = 19;
	public static readonly RULE_when_aggregation_type = 20;
	public static readonly RULE_when_expression = 21;
	public static readonly RULE_post = 22;
	public static readonly RULE_post_condition = 23;
	public static readonly RULE_assignment = 24;
	public static readonly RULE_assignment_key = 25;
	public static readonly RULE_method_call = 26;
	public static readonly RULE_method_environment = 27;
	public static readonly RULE_method_call_simple = 28;
	public static readonly RULE_method_call_java = 29;
	public static readonly RULE_method_arg_list = 30;
	public static readonly RULE_method_arg = 31;
	public static readonly RULE_method_arg_key = 32;
	public static readonly RULE_expression = 33;
	public static readonly RULE_expression_list = 34;
	public static readonly RULE_primary = 35;
	public static readonly RULE_literal = 36;
	public static readonly RULE_identifier = 37;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"pipeline", "groovy_definition", "environment", "parameters", "agent", 
		"agent_section", "agent_type", "tools", "pipeline_options", "triggers", 
		"stages", "stage_definition", "stage_name", "fail_fast", "steps", "step", 
		"script", "input", "when", "when_aggregation", "when_aggregation_type", 
		"when_expression", "post", "post_condition", "assignment", "assignment_key", 
		"method_call", "method_environment", "method_call_simple", "method_call_java", 
		"method_arg_list", "method_arg", "method_arg_key", "expression", "expression_list", 
		"primary", "literal", "identifier",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "'++'", "'--'", "'+'", "'-'", "'~'", "'!'", "'*'", "'/'", 
		"'%'", "'<='", "'>='", "'>'", "'<'", "'!='", "'==~'", "'&'", "'^'", "'|'", 
		"'&&'", "'||'", "'?'", "'+='", "'-='", "'*='", "'/='", "'&='", "'|='", 
		"'^='", "'>>='", "'>>>='", "'<<='", "'%='", undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "'null'", undefined, "'pipeline'", 
		"'stages'", "'parallel'", "'stage'", "'steps'", "'environment'", "'input'", 
		"'tools'", "'parameters'", "'options'", "'triggers'", "'agent'", "'post'", 
		"'when'", undefined, undefined, "'not'", "'expression'", undefined, undefined, 
		undefined, "'Jenkinsfile (Declarative Pipeline)'", undefined, undefined, 
		"'('", "')'", "'{'", "'}'", "'['", "']'", "':'", "','", "'.'", "'=='", 
		"'='",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "DECIMAL_LITERAL", 
		"HEX_LITERAL", "OCT_LITERAL", "BINARY_LITERAL", "FLOAT_LITERAL", "HEX_FLOAT_LITERAL", 
		"BOOL_LITERAL", "NULL_LITERAL", "STRING_LITERAL", "PIPELINE", "STAGES", 
		"PARALLEL", "STAGE", "STEPS", "ENVIRONMENT", "INPUT", "TOOLS", "PARAMETERS", 
		"OPTIONS", "TRIGGERS", "AGENT", "POST", "WHEN", "ANYOF", "ALLOF", "NOT", 
		"EXPRESSION", "FAIL_FAST", "SCRIPT_LITERAL", "DEF_LITERAL", "JENKINSFILE_DECLARATIVE", 
		"LIBRARY_LITERAL", "IMPORT_LITERAL", "LPAREN", "RPAREN", "LBRACE", "RBRACE", 
		"LBRACK", "RBRACK", "COLON", "COMMA", "DOT", "EQUALS", "ASSIGN", "MULTI_COMMENT", 
		"WS", "LINE_COMMENT1", "LINE_COMMENT2", "REGEXP_LITERAL", "IDENTIFIER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(jenkinsfileParser._LITERAL_NAMES, jenkinsfileParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return jenkinsfileParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "jenkinsfile.g4"; }

	// @Override
	public get ruleNames(): string[] { return jenkinsfileParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return jenkinsfileParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(jenkinsfileParser._ATN, this);
	}
	// @RuleVersion(0)
	public pipeline(): PipelineContext {
		let _localctx: PipelineContext = new PipelineContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, jenkinsfileParser.RULE_pipeline);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (jenkinsfileParser.DEF_LITERAL - 63)) | (1 << (jenkinsfileParser.JENKINSFILE_DECLARATIVE - 63)) | (1 << (jenkinsfileParser.LIBRARY_LITERAL - 63)))) !== 0)) {
				{
				this.state = 78;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case jenkinsfileParser.DEF_LITERAL:
				case jenkinsfileParser.LIBRARY_LITERAL:
					{
					this.state = 76;
					this.groovy_definition();
					}
					break;
				case jenkinsfileParser.JENKINSFILE_DECLARATIVE:
					{
					this.state = 77;
					this.match(jenkinsfileParser.JENKINSFILE_DECLARATIVE);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 83;
			this.match(jenkinsfileParser.PIPELINE);
			this.state = 84;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (jenkinsfileParser.STAGES - 44)) | (1 << (jenkinsfileParser.PARALLEL - 44)) | (1 << (jenkinsfileParser.ENVIRONMENT - 44)) | (1 << (jenkinsfileParser.TOOLS - 44)) | (1 << (jenkinsfileParser.PARAMETERS - 44)) | (1 << (jenkinsfileParser.OPTIONS - 44)) | (1 << (jenkinsfileParser.TRIGGERS - 44)) | (1 << (jenkinsfileParser.AGENT - 44)) | (1 << (jenkinsfileParser.POST - 44)))) !== 0)) {
				{
				this.state = 93;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case jenkinsfileParser.ENVIRONMENT:
					{
					this.state = 85;
					this.environment();
					}
					break;
				case jenkinsfileParser.AGENT:
					{
					this.state = 86;
					this.agent();
					}
					break;
				case jenkinsfileParser.TOOLS:
					{
					this.state = 87;
					this.tools();
					}
					break;
				case jenkinsfileParser.OPTIONS:
					{
					this.state = 88;
					this.pipeline_options();
					}
					break;
				case jenkinsfileParser.PARAMETERS:
					{
					this.state = 89;
					this.parameters();
					}
					break;
				case jenkinsfileParser.TRIGGERS:
					{
					this.state = 90;
					this.triggers();
					}
					break;
				case jenkinsfileParser.STAGES:
				case jenkinsfileParser.PARALLEL:
					{
					this.state = 91;
					this.stages();
					}
					break;
				case jenkinsfileParser.POST:
					{
					this.state = 92;
					this.post();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 97;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 98;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public groovy_definition(): Groovy_definitionContext {
		let _localctx: Groovy_definitionContext = new Groovy_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, jenkinsfileParser.RULE_groovy_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			_la = this._input.LA(1);
			if (!(_la === jenkinsfileParser.DEF_LITERAL || _la === jenkinsfileParser.LIBRARY_LITERAL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public environment(): EnvironmentContext {
		let _localctx: EnvironmentContext = new EnvironmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, jenkinsfileParser.RULE_environment);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 102;
			this.match(jenkinsfileParser.ENVIRONMENT);
			this.state = 103;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 104;
				this.assignment();
				}
				}
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 110;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let _localctx: ParametersContext = new ParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, jenkinsfileParser.RULE_parameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.match(jenkinsfileParser.PARAMETERS);
			this.state = 113;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 114;
				this.method_call();
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 120;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public agent(): AgentContext {
		let _localctx: AgentContext = new AgentContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, jenkinsfileParser.RULE_agent);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 122;
			this.match(jenkinsfileParser.AGENT);
			this.state = 125;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case jenkinsfileParser.LBRACE:
				{
				this.state = 123;
				this.agent_section();
				}
				break;
			case jenkinsfileParser.PIPELINE:
			case jenkinsfileParser.STAGES:
			case jenkinsfileParser.PARALLEL:
			case jenkinsfileParser.STAGE:
			case jenkinsfileParser.STEPS:
			case jenkinsfileParser.ENVIRONMENT:
			case jenkinsfileParser.INPUT:
			case jenkinsfileParser.TOOLS:
			case jenkinsfileParser.PARAMETERS:
			case jenkinsfileParser.OPTIONS:
			case jenkinsfileParser.TRIGGERS:
			case jenkinsfileParser.AGENT:
			case jenkinsfileParser.POST:
			case jenkinsfileParser.WHEN:
			case jenkinsfileParser.ANYOF:
			case jenkinsfileParser.ALLOF:
			case jenkinsfileParser.NOT:
			case jenkinsfileParser.EXPRESSION:
			case jenkinsfileParser.FAIL_FAST:
			case jenkinsfileParser.IDENTIFIER:
				{
				this.state = 124;
				this.agent_type();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public agent_section(): Agent_sectionContext {
		let _localctx: Agent_sectionContext = new Agent_sectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, jenkinsfileParser.RULE_agent_section);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 127;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 145;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 128;
				this.agent_type();
				this.state = 137;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === jenkinsfileParser.LBRACE) {
					{
					this.state = 129;
					this.match(jenkinsfileParser.LBRACE);
					this.state = 133;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
						{
						{
						this.state = 130;
						this.method_call();
						}
						}
						this.state = 135;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 136;
					this.match(jenkinsfileParser.RBRACE);
					}
				}

				}
				break;

			case 2:
				{
				this.state = 142;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
					{
					{
					this.state = 139;
					this.method_call();
					}
					}
					this.state = 144;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
			this.state = 147;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public agent_type(): Agent_typeContext {
		let _localctx: Agent_typeContext = new Agent_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, jenkinsfileParser.RULE_agent_type);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tools(): ToolsContext {
		let _localctx: ToolsContext = new ToolsContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, jenkinsfileParser.RULE_tools);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			this.match(jenkinsfileParser.TOOLS);
			this.state = 152;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 153;
				this.method_call();
				}
				}
				this.state = 158;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 159;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pipeline_options(): Pipeline_optionsContext {
		let _localctx: Pipeline_optionsContext = new Pipeline_optionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, jenkinsfileParser.RULE_pipeline_options);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 161;
			this.match(jenkinsfileParser.OPTIONS);
			this.state = 162;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 166;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 163;
				this.method_call();
				}
				}
				this.state = 168;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 169;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public triggers(): TriggersContext {
		let _localctx: TriggersContext = new TriggersContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, jenkinsfileParser.RULE_triggers);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
			this.match(jenkinsfileParser.TRIGGERS);
			this.state = 172;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 173;
				this.method_call();
				}
				}
				this.state = 178;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 179;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stages(): StagesContext {
		let _localctx: StagesContext = new StagesContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, jenkinsfileParser.RULE_stages);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 181;
			_la = this._input.LA(1);
			if (!(_la === jenkinsfileParser.STAGES || _la === jenkinsfileParser.PARALLEL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 182;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === jenkinsfileParser.STAGE) {
				{
				{
				this.state = 183;
				this.stage_definition();
				}
				}
				this.state = 188;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 189;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stage_definition(): Stage_definitionContext {
		let _localctx: Stage_definitionContext = new Stage_definitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, jenkinsfileParser.RULE_stage_definition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.match(jenkinsfileParser.STAGE);
			this.state = 197;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === jenkinsfileParser.LPAREN) {
				{
				this.state = 192;
				this.match(jenkinsfileParser.LPAREN);
				this.state = 194;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === jenkinsfileParser.STRING_LITERAL) {
					{
					this.state = 193;
					this.stage_name();
					}
				}

				this.state = 196;
				this.match(jenkinsfileParser.RPAREN);
				}
			}

			this.state = 199;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 211;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (jenkinsfileParser.STAGES - 44)) | (1 << (jenkinsfileParser.PARALLEL - 44)) | (1 << (jenkinsfileParser.STEPS - 44)) | (1 << (jenkinsfileParser.ENVIRONMENT - 44)) | (1 << (jenkinsfileParser.INPUT - 44)) | (1 << (jenkinsfileParser.TOOLS - 44)) | (1 << (jenkinsfileParser.AGENT - 44)) | (1 << (jenkinsfileParser.POST - 44)) | (1 << (jenkinsfileParser.WHEN - 44)) | (1 << (jenkinsfileParser.FAIL_FAST - 44)))) !== 0)) {
				{
				this.state = 209;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case jenkinsfileParser.ENVIRONMENT:
					{
					this.state = 200;
					this.environment();
					}
					break;
				case jenkinsfileParser.INPUT:
					{
					this.state = 201;
					this.input();
					}
					break;
				case jenkinsfileParser.TOOLS:
					{
					this.state = 202;
					this.tools();
					}
					break;
				case jenkinsfileParser.AGENT:
					{
					this.state = 203;
					this.agent();
					}
					break;
				case jenkinsfileParser.WHEN:
					{
					this.state = 204;
					this.when();
					}
					break;
				case jenkinsfileParser.STAGES:
				case jenkinsfileParser.PARALLEL:
					{
					this.state = 205;
					this.stages();
					}
					break;
				case jenkinsfileParser.STEPS:
					{
					this.state = 206;
					this.steps();
					}
					break;
				case jenkinsfileParser.POST:
					{
					this.state = 207;
					this.post();
					}
					break;
				case jenkinsfileParser.FAIL_FAST:
					{
					this.state = 208;
					this.fail_fast();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 213;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 214;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stage_name(): Stage_nameContext {
		let _localctx: Stage_nameContext = new Stage_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, jenkinsfileParser.RULE_stage_name);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 216;
			this.match(jenkinsfileParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fail_fast(): Fail_fastContext {
		let _localctx: Fail_fastContext = new Fail_fastContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, jenkinsfileParser.RULE_fail_fast);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 218;
			this.match(jenkinsfileParser.FAIL_FAST);
			this.state = 219;
			this.match(jenkinsfileParser.BOOL_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public steps(): StepsContext {
		let _localctx: StepsContext = new StepsContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, jenkinsfileParser.RULE_steps);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 221;
			this.match(jenkinsfileParser.STEPS);
			this.state = 222;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)) | (1 << (jenkinsfileParser.SCRIPT_LITERAL - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 223;
				this.step();
				}
				}
				this.state = 228;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 229;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public step(): StepContext {
		let _localctx: StepContext = new StepContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, jenkinsfileParser.RULE_step);
		try {
			this.state = 233;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case jenkinsfileParser.SCRIPT_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 231;
				this.script();
				}
				break;
			case jenkinsfileParser.PIPELINE:
			case jenkinsfileParser.STAGES:
			case jenkinsfileParser.PARALLEL:
			case jenkinsfileParser.STAGE:
			case jenkinsfileParser.STEPS:
			case jenkinsfileParser.ENVIRONMENT:
			case jenkinsfileParser.INPUT:
			case jenkinsfileParser.TOOLS:
			case jenkinsfileParser.PARAMETERS:
			case jenkinsfileParser.OPTIONS:
			case jenkinsfileParser.TRIGGERS:
			case jenkinsfileParser.AGENT:
			case jenkinsfileParser.POST:
			case jenkinsfileParser.WHEN:
			case jenkinsfileParser.ANYOF:
			case jenkinsfileParser.ALLOF:
			case jenkinsfileParser.NOT:
			case jenkinsfileParser.EXPRESSION:
			case jenkinsfileParser.FAIL_FAST:
			case jenkinsfileParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 232;
				this.method_call();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public script(): ScriptContext {
		let _localctx: ScriptContext = new ScriptContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, jenkinsfileParser.RULE_script);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 235;
			this.match(jenkinsfileParser.SCRIPT_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public input(): InputContext {
		let _localctx: InputContext = new InputContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, jenkinsfileParser.RULE_input);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 237;
			this.match(jenkinsfileParser.INPUT);
			this.state = 238;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 239;
				this.method_call();
				}
				}
				this.state = 244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 245;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when(): WhenContext {
		let _localctx: WhenContext = new WhenContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, jenkinsfileParser.RULE_when);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 247;
			this.match(jenkinsfileParser.WHEN);
			this.state = 248;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 254;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				this.state = 252;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
				case 1:
					{
					this.state = 249;
					this.method_call();
					}
					break;

				case 2:
					{
					this.state = 250;
					this.when_aggregation();
					}
					break;

				case 3:
					{
					this.state = 251;
					this.when_expression();
					}
					break;
				}
				}
				this.state = 256;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 257;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when_aggregation(): When_aggregationContext {
		let _localctx: When_aggregationContext = new When_aggregationContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, jenkinsfileParser.RULE_when_aggregation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			this.when_aggregation_type();
			this.state = 260;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 266;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				this.state = 264;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
				case 1:
					{
					this.state = 261;
					this.method_call();
					}
					break;

				case 2:
					{
					this.state = 262;
					this.when_aggregation();
					}
					break;

				case 3:
					{
					this.state = 263;
					this.when_expression();
					}
					break;
				}
				}
				this.state = 268;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 269;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when_aggregation_type(): When_aggregation_typeContext {
		let _localctx: When_aggregation_typeContext = new When_aggregation_typeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, jenkinsfileParser.RULE_when_aggregation_type);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 271;
			_la = this._input.LA(1);
			if (!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & ((1 << (jenkinsfileParser.ANYOF - 57)) | (1 << (jenkinsfileParser.ALLOF - 57)) | (1 << (jenkinsfileParser.NOT - 57)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public when_expression(): When_expressionContext {
		let _localctx: When_expressionContext = new When_expressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, jenkinsfileParser.RULE_when_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			this.match(jenkinsfileParser.EXPRESSION);
			this.state = 274;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 275;
			this.expression(0);
			this.state = 276;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public post(): PostContext {
		let _localctx: PostContext = new PostContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, jenkinsfileParser.RULE_post);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 278;
			this.match(jenkinsfileParser.POST);
			this.state = 279;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 280;
				this.post_condition();
				}
				}
				this.state = 285;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 286;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public post_condition(): Post_conditionContext {
		let _localctx: Post_conditionContext = new Post_conditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, jenkinsfileParser.RULE_post_condition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 288;
			this.identifier();
			this.state = 289;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)) | (1 << (jenkinsfileParser.SCRIPT_LITERAL - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 290;
				this.step();
				}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 296;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let _localctx: AssignmentContext = new AssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, jenkinsfileParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 298;
			this.assignment_key();
			this.state = 299;
			this.match(jenkinsfileParser.ASSIGN);
			this.state = 300;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment_key(): Assignment_keyContext {
		let _localctx: Assignment_keyContext = new Assignment_keyContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, jenkinsfileParser.RULE_assignment_key);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 302;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_call(): Method_callContext {
		let _localctx: Method_callContext = new Method_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, jenkinsfileParser.RULE_method_call);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 307;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 304;
				this.method_call_simple();
				}
				break;

			case 2:
				{
				this.state = 305;
				this.method_call_java();
				}
				break;

			case 3:
				{
				this.state = 306;
				this.method_environment();
				}
				break;
			}
			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === jenkinsfileParser.T__0) {
				{
				this.state = 309;
				this.match(jenkinsfileParser.T__0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_environment(): Method_environmentContext {
		let _localctx: Method_environmentContext = new Method_environmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, jenkinsfileParser.RULE_method_environment);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 312;
			this.method_call_java();
			this.state = 313;
			this.match(jenkinsfileParser.LBRACE);
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)) | (1 << (jenkinsfileParser.SCRIPT_LITERAL - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER) {
				{
				{
				this.state = 314;
				this.step();
				}
				}
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 320;
			this.match(jenkinsfileParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_call_simple(): Method_call_simpleContext {
		let _localctx: Method_call_simpleContext = new Method_call_simpleContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, jenkinsfileParser.RULE_method_call_simple);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 322;
			this.identifier();
			this.state = 323;
			this.method_arg_list();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_call_java(): Method_call_javaContext {
		let _localctx: Method_call_javaContext = new Method_call_javaContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, jenkinsfileParser.RULE_method_call_java);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 325;
			this.identifier();
			this.state = 326;
			this.match(jenkinsfileParser.LPAREN);
			this.state = 328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << jenkinsfileParser.T__1) | (1 << jenkinsfileParser.T__2) | (1 << jenkinsfileParser.T__3) | (1 << jenkinsfileParser.T__4) | (1 << jenkinsfileParser.T__5) | (1 << jenkinsfileParser.T__6))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (jenkinsfileParser.DECIMAL_LITERAL - 34)) | (1 << (jenkinsfileParser.FLOAT_LITERAL - 34)) | (1 << (jenkinsfileParser.BOOL_LITERAL - 34)) | (1 << (jenkinsfileParser.NULL_LITERAL - 34)) | (1 << (jenkinsfileParser.STRING_LITERAL - 34)) | (1 << (jenkinsfileParser.PIPELINE - 34)) | (1 << (jenkinsfileParser.STAGES - 34)) | (1 << (jenkinsfileParser.PARALLEL - 34)) | (1 << (jenkinsfileParser.STAGE - 34)) | (1 << (jenkinsfileParser.STEPS - 34)) | (1 << (jenkinsfileParser.ENVIRONMENT - 34)) | (1 << (jenkinsfileParser.INPUT - 34)) | (1 << (jenkinsfileParser.TOOLS - 34)) | (1 << (jenkinsfileParser.PARAMETERS - 34)) | (1 << (jenkinsfileParser.OPTIONS - 34)) | (1 << (jenkinsfileParser.TRIGGERS - 34)) | (1 << (jenkinsfileParser.AGENT - 34)) | (1 << (jenkinsfileParser.POST - 34)) | (1 << (jenkinsfileParser.WHEN - 34)) | (1 << (jenkinsfileParser.ANYOF - 34)) | (1 << (jenkinsfileParser.ALLOF - 34)) | (1 << (jenkinsfileParser.NOT - 34)) | (1 << (jenkinsfileParser.EXPRESSION - 34)) | (1 << (jenkinsfileParser.FAIL_FAST - 34)))) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & ((1 << (jenkinsfileParser.LPAREN - 67)) | (1 << (jenkinsfileParser.LBRACK - 67)) | (1 << (jenkinsfileParser.REGEXP_LITERAL - 67)) | (1 << (jenkinsfileParser.IDENTIFIER - 67)))) !== 0)) {
				{
				this.state = 327;
				this.method_arg_list();
				}
			}

			this.state = 330;
			this.match(jenkinsfileParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_arg_list(): Method_arg_listContext {
		let _localctx: Method_arg_listContext = new Method_arg_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, jenkinsfileParser.RULE_method_arg_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 332;
			this.method_arg();
			this.state = 337;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 333;
					this.match(jenkinsfileParser.COMMA);
					this.state = 334;
					this.method_arg();
					}
					}
				}
				this.state = 339;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			}
			this.state = 341;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === jenkinsfileParser.COMMA) {
				{
				this.state = 340;
				this.match(jenkinsfileParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_arg(): Method_argContext {
		let _localctx: Method_argContext = new Method_argContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, jenkinsfileParser.RULE_method_arg);
		try {
			this.state = 348;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 343;
				this.method_arg_key();
				this.state = 344;
				this.match(jenkinsfileParser.COLON);
				this.state = 345;
				this.expression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 347;
				this.expression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public method_arg_key(): Method_arg_keyContext {
		let _localctx: Method_arg_keyContext = new Method_arg_keyContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, jenkinsfileParser.RULE_method_arg_key);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 350;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 66;
		this.enterRecursionRule(_localctx, 66, jenkinsfileParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 368;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 353;
				this.primary();
				}
				break;

			case 2:
				{
				this.state = 354;
				_localctx._prefix = this.match(jenkinsfileParser.LBRACK);
				this.state = 356;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << jenkinsfileParser.T__1) | (1 << jenkinsfileParser.T__2) | (1 << jenkinsfileParser.T__3) | (1 << jenkinsfileParser.T__4) | (1 << jenkinsfileParser.T__5) | (1 << jenkinsfileParser.T__6))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (jenkinsfileParser.DECIMAL_LITERAL - 34)) | (1 << (jenkinsfileParser.FLOAT_LITERAL - 34)) | (1 << (jenkinsfileParser.BOOL_LITERAL - 34)) | (1 << (jenkinsfileParser.NULL_LITERAL - 34)) | (1 << (jenkinsfileParser.STRING_LITERAL - 34)) | (1 << (jenkinsfileParser.PIPELINE - 34)) | (1 << (jenkinsfileParser.STAGES - 34)) | (1 << (jenkinsfileParser.PARALLEL - 34)) | (1 << (jenkinsfileParser.STAGE - 34)) | (1 << (jenkinsfileParser.STEPS - 34)) | (1 << (jenkinsfileParser.ENVIRONMENT - 34)) | (1 << (jenkinsfileParser.INPUT - 34)) | (1 << (jenkinsfileParser.TOOLS - 34)) | (1 << (jenkinsfileParser.PARAMETERS - 34)) | (1 << (jenkinsfileParser.OPTIONS - 34)) | (1 << (jenkinsfileParser.TRIGGERS - 34)) | (1 << (jenkinsfileParser.AGENT - 34)) | (1 << (jenkinsfileParser.POST - 34)) | (1 << (jenkinsfileParser.WHEN - 34)) | (1 << (jenkinsfileParser.ANYOF - 34)) | (1 << (jenkinsfileParser.ALLOF - 34)) | (1 << (jenkinsfileParser.NOT - 34)) | (1 << (jenkinsfileParser.EXPRESSION - 34)) | (1 << (jenkinsfileParser.FAIL_FAST - 34)))) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & ((1 << (jenkinsfileParser.LPAREN - 67)) | (1 << (jenkinsfileParser.LBRACK - 67)) | (1 << (jenkinsfileParser.REGEXP_LITERAL - 67)) | (1 << (jenkinsfileParser.IDENTIFIER - 67)))) !== 0)) {
					{
					this.state = 355;
					this.expression_list();
					}
				}

				this.state = 358;
				_localctx._postfix = this.match(jenkinsfileParser.RBRACK);
				}
				break;

			case 3:
				{
				this.state = 359;
				this.identifier();
				this.state = 360;
				_localctx._bop = this.match(jenkinsfileParser.COLON);
				this.state = 361;
				this.expression(16);
				}
				break;

			case 4:
				{
				this.state = 363;
				this.method_call_java();
				}
				break;

			case 5:
				{
				this.state = 364;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << jenkinsfileParser.T__1) | (1 << jenkinsfileParser.T__2) | (1 << jenkinsfileParser.T__3) | (1 << jenkinsfileParser.T__4))) !== 0))) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 365;
				this.expression(13);
				}
				break;

			case 6:
				{
				this.state = 366;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === jenkinsfileParser.T__5 || _la === jenkinsfileParser.T__6)) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 367;
				this.expression(12);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 421;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 419;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 370;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 371;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << jenkinsfileParser.T__7) | (1 << jenkinsfileParser.T__8) | (1 << jenkinsfileParser.T__9))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 372;
						this.expression(12);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 373;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 374;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === jenkinsfileParser.T__3 || _la === jenkinsfileParser.T__4)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 375;
						this.expression(11);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 376;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 377;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << jenkinsfileParser.T__10) | (1 << jenkinsfileParser.T__11) | (1 << jenkinsfileParser.T__12) | (1 << jenkinsfileParser.T__13))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 378;
						this.expression(10);
						}
						break;

					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 379;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 380;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === jenkinsfileParser.T__14 || _la === jenkinsfileParser.T__15 || _la === jenkinsfileParser.EQUALS)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 381;
						this.expression(9);
						}
						break;

					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 382;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 383;
						_localctx._bop = this.match(jenkinsfileParser.T__16);
						this.state = 384;
						this.expression(8);
						}
						break;

					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 385;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 386;
						_localctx._bop = this.match(jenkinsfileParser.T__17);
						this.state = 387;
						this.expression(7);
						}
						break;

					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 388;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 389;
						_localctx._bop = this.match(jenkinsfileParser.T__18);
						this.state = 390;
						this.expression(6);
						}
						break;

					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 391;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 392;
						_localctx._bop = this.match(jenkinsfileParser.T__19);
						this.state = 393;
						this.expression(5);
						}
						break;

					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 394;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 395;
						_localctx._bop = this.match(jenkinsfileParser.T__20);
						this.state = 396;
						this.expression(4);
						}
						break;

					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 397;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 398;
						_localctx._bop = this.match(jenkinsfileParser.T__21);
						this.state = 399;
						this.expression(0);
						this.state = 400;
						this.match(jenkinsfileParser.COLON);
						this.state = 401;
						this.expression(3);
						}
						break;

					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 403;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 404;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & ((1 << (jenkinsfileParser.T__22 - 23)) | (1 << (jenkinsfileParser.T__23 - 23)) | (1 << (jenkinsfileParser.T__24 - 23)) | (1 << (jenkinsfileParser.T__25 - 23)) | (1 << (jenkinsfileParser.T__26 - 23)) | (1 << (jenkinsfileParser.T__27 - 23)) | (1 << (jenkinsfileParser.T__28 - 23)) | (1 << (jenkinsfileParser.T__29 - 23)) | (1 << (jenkinsfileParser.T__30 - 23)) | (1 << (jenkinsfileParser.T__31 - 23)) | (1 << (jenkinsfileParser.T__32 - 23)))) !== 0) || _la === jenkinsfileParser.ASSIGN)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 405;
						this.expression(1);
						}
						break;

					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 406;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 407;
						_localctx._bop = this.match(jenkinsfileParser.DOT);
						this.state = 410;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
						case 1:
							{
							this.state = 408;
							this.identifier();
							}
							break;

						case 2:
							{
							this.state = 409;
							this.method_call_java();
							}
							break;
						}
						}
						break;

					case 13:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 412;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 413;
						this.match(jenkinsfileParser.LBRACK);
						this.state = 414;
						this.expression(0);
						this.state = 415;
						this.match(jenkinsfileParser.RBRACK);
						}
						break;

					case 14:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, jenkinsfileParser.RULE_expression);
						this.state = 417;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 418;
						_localctx._postfix = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === jenkinsfileParser.T__1 || _la === jenkinsfileParser.T__2)) {
							_localctx._postfix = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						break;
					}
					}
				}
				this.state = 423;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression_list(): Expression_listContext {
		let _localctx: Expression_listContext = new Expression_listContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, jenkinsfileParser.RULE_expression_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 424;
			this.expression(0);
			this.state = 429;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 40, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 425;
					this.match(jenkinsfileParser.COMMA);
					this.state = 426;
					this.expression(0);
					}
					}
				}
				this.state = 431;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 40, this._ctx);
			}
			this.state = 433;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === jenkinsfileParser.COMMA) {
				{
				this.state = 432;
				this.match(jenkinsfileParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, jenkinsfileParser.RULE_primary);
		try {
			this.state = 441;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case jenkinsfileParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 435;
				this.match(jenkinsfileParser.LPAREN);
				this.state = 436;
				this.expression(0);
				this.state = 437;
				this.match(jenkinsfileParser.RPAREN);
				}
				break;
			case jenkinsfileParser.DECIMAL_LITERAL:
			case jenkinsfileParser.FLOAT_LITERAL:
			case jenkinsfileParser.BOOL_LITERAL:
			case jenkinsfileParser.NULL_LITERAL:
			case jenkinsfileParser.STRING_LITERAL:
			case jenkinsfileParser.REGEXP_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 439;
				this.literal();
				}
				break;
			case jenkinsfileParser.PIPELINE:
			case jenkinsfileParser.STAGES:
			case jenkinsfileParser.PARALLEL:
			case jenkinsfileParser.STAGE:
			case jenkinsfileParser.STEPS:
			case jenkinsfileParser.ENVIRONMENT:
			case jenkinsfileParser.INPUT:
			case jenkinsfileParser.TOOLS:
			case jenkinsfileParser.PARAMETERS:
			case jenkinsfileParser.OPTIONS:
			case jenkinsfileParser.TRIGGERS:
			case jenkinsfileParser.AGENT:
			case jenkinsfileParser.POST:
			case jenkinsfileParser.WHEN:
			case jenkinsfileParser.ANYOF:
			case jenkinsfileParser.ALLOF:
			case jenkinsfileParser.NOT:
			case jenkinsfileParser.EXPRESSION:
			case jenkinsfileParser.FAIL_FAST:
			case jenkinsfileParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 440;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, jenkinsfileParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 443;
			_la = this._input.LA(1);
			if (!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (jenkinsfileParser.DECIMAL_LITERAL - 34)) | (1 << (jenkinsfileParser.FLOAT_LITERAL - 34)) | (1 << (jenkinsfileParser.BOOL_LITERAL - 34)) | (1 << (jenkinsfileParser.NULL_LITERAL - 34)) | (1 << (jenkinsfileParser.STRING_LITERAL - 34)))) !== 0) || _la === jenkinsfileParser.REGEXP_LITERAL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, jenkinsfileParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 445;
			_la = this._input.LA(1);
			if (!(((((_la - 43)) & ~0x1F) === 0 && ((1 << (_la - 43)) & ((1 << (jenkinsfileParser.PIPELINE - 43)) | (1 << (jenkinsfileParser.STAGES - 43)) | (1 << (jenkinsfileParser.PARALLEL - 43)) | (1 << (jenkinsfileParser.STAGE - 43)) | (1 << (jenkinsfileParser.STEPS - 43)) | (1 << (jenkinsfileParser.ENVIRONMENT - 43)) | (1 << (jenkinsfileParser.INPUT - 43)) | (1 << (jenkinsfileParser.TOOLS - 43)) | (1 << (jenkinsfileParser.PARAMETERS - 43)) | (1 << (jenkinsfileParser.OPTIONS - 43)) | (1 << (jenkinsfileParser.TRIGGERS - 43)) | (1 << (jenkinsfileParser.AGENT - 43)) | (1 << (jenkinsfileParser.POST - 43)) | (1 << (jenkinsfileParser.WHEN - 43)) | (1 << (jenkinsfileParser.ANYOF - 43)) | (1 << (jenkinsfileParser.ALLOF - 43)) | (1 << (jenkinsfileParser.NOT - 43)) | (1 << (jenkinsfileParser.EXPRESSION - 43)) | (1 << (jenkinsfileParser.FAIL_FAST - 43)))) !== 0) || _la === jenkinsfileParser.IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 33:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 11);

		case 1:
			return this.precpred(this._ctx, 10);

		case 2:
			return this.precpred(this._ctx, 9);

		case 3:
			return this.precpred(this._ctx, 8);

		case 4:
			return this.precpred(this._ctx, 7);

		case 5:
			return this.precpred(this._ctx, 6);

		case 6:
			return this.precpred(this._ctx, 5);

		case 7:
			return this.precpred(this._ctx, 4);

		case 8:
			return this.precpred(this._ctx, 3);

		case 9:
			return this.precpred(this._ctx, 2);

		case 10:
			return this.precpred(this._ctx, 1);

		case 11:
			return this.precpred(this._ctx, 19);

		case 12:
			return this.precpred(this._ctx, 18);

		case 13:
			return this.precpred(this._ctx, 14);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03U\u01C2\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x03\x02\x03\x02\x07\x02Q\n\x02\f" +
		"\x02\x0E\x02T\v\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x07\x02`\n\x02\f\x02\x0E\x02c\v\x02\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x07\x04l\n\x04\f\x04" +
		"\x0E\x04o\v\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x07\x05v\n\x05" +
		"\f\x05\x0E\x05y\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x05\x06" +
		"\x80\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07\x86\n\x07\f\x07\x0E" +
		"\x07\x89\v\x07\x03\x07\x05\x07\x8C\n\x07\x03\x07\x07\x07\x8F\n\x07\f\x07" +
		"\x0E\x07\x92\v\x07\x05\x07\x94\n\x07\x03\x07\x03\x07\x03\b\x03\b\x03\t" +
		"\x03\t\x03\t\x07\t\x9D\n\t\f\t\x0E\t\xA0\v\t\x03\t\x03\t\x03\n\x03\n\x03" +
		"\n\x07\n\xA7\n\n\f\n\x0E\n\xAA\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x07\v" +
		"\xB1\n\v\f\v\x0E\v\xB4\v\v\x03\v\x03\v\x03\f\x03\f\x03\f\x07\f\xBB\n\f" +
		"\f\f\x0E\f\xBE\v\f\x03\f\x03\f\x03\r\x03\r\x03\r\x05\r\xC5\n\r\x03\r\x05" +
		"\r\xC8\n\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r" +
		"\x07\r\xD4\n\r\f\r\x0E\r\xD7\v\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x07\x10\xE3\n\x10\f\x10\x0E\x10\xE6" +
		"\v\x10\x03\x10\x03\x10\x03\x11\x03\x11\x05\x11\xEC\n\x11\x03\x12\x03\x12" +
		"\x03\x13\x03\x13\x03\x13\x07\x13\xF3\n\x13\f\x13\x0E\x13\xF6\v\x13\x03" +
		"\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x07\x14\xFF\n\x14" +
		"\f\x14\x0E\x14\u0102\v\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03" +
		"\x15\x03\x15\x07\x15\u010B\n\x15\f\x15\x0E\x15\u010E\v\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x18\x03" +
		"\x18\x03\x18\x07\x18\u011C\n\x18\f\x18\x0E\x18\u011F\v\x18\x03\x18\x03" +
		"\x18\x03\x19\x03\x19\x03\x19\x07\x19\u0126\n\x19\f\x19\x0E\x19\u0129\v" +
		"\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03" +
		"\x1C\x03\x1C\x03\x1C\x05\x1C\u0136\n\x1C\x03\x1C\x05\x1C\u0139\n\x1C\x03" +
		"\x1D\x03\x1D\x03\x1D\x07\x1D\u013E\n\x1D\f\x1D\x0E\x1D\u0141\v\x1D\x03" +
		"\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u014B" +
		"\n\x1F\x03\x1F\x03\x1F\x03 \x03 \x03 \x07 \u0152\n \f \x0E \u0155\v \x03" +
		" \x05 \u0158\n \x03!\x03!\x03!\x03!\x03!\x05!\u015F\n!\x03\"\x03\"\x03" +
		"#\x03#\x03#\x03#\x05#\u0167\n#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x05#\u0173\n#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x05#\u019D\n#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x07" +
		"#\u01A6\n#\f#\x0E#\u01A9\v#\x03$\x03$\x03$\x07$\u01AE\n$\f$\x0E$\u01B1" +
		"\v$\x03$\x05$\u01B4\n$\x03%\x03%\x03%\x03%\x03%\x03%\x05%\u01BC\n%\x03" +
		"&\x03&\x03\'\x03\'\x03\'\x02\x02\x03D(\x02\x02\x04\x02\x06\x02\b\x02\n" +
		"\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C" +
		"\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026" +
		"\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02\x02\x0F\x04" +
		"\x02AACC\x03\x02./\x03\x02;=\x03\x02\x04\x07\x03\x02\b\t\x03\x02\n\f\x03" +
		"\x02\x06\x07\x03\x02\r\x10\x04\x02\x11\x12NN\x04\x02\x19#OO\x03\x02\x04" +
		"\x05\x06\x02$$((*,TT\x04\x02-?UU\x02\u01E7\x02R\x03\x02\x02\x02\x04f\x03" +
		"\x02\x02\x02\x06h\x03\x02\x02\x02\br\x03\x02\x02\x02\n|\x03\x02\x02\x02" +
		"\f\x81\x03\x02\x02\x02\x0E\x97\x03\x02\x02\x02\x10\x99\x03\x02\x02\x02" +
		"\x12\xA3\x03\x02\x02\x02\x14\xAD\x03\x02\x02\x02\x16\xB7\x03\x02\x02\x02" +
		"\x18\xC1\x03\x02\x02\x02\x1A\xDA\x03\x02\x02\x02\x1C\xDC\x03\x02\x02\x02" +
		"\x1E\xDF\x03\x02\x02\x02 \xEB\x03\x02\x02\x02\"\xED\x03\x02\x02\x02$\xEF" +
		"\x03\x02\x02\x02&\xF9\x03\x02\x02\x02(\u0105\x03\x02\x02\x02*\u0111\x03" +
		"\x02\x02\x02,\u0113\x03\x02\x02\x02.\u0118\x03\x02\x02\x020\u0122\x03" +
		"\x02\x02\x022\u012C\x03\x02\x02\x024\u0130\x03\x02\x02\x026\u0135\x03" +
		"\x02\x02\x028\u013A\x03\x02\x02\x02:\u0144\x03\x02\x02\x02<\u0147\x03" +
		"\x02\x02\x02>\u014E\x03\x02\x02\x02@\u015E\x03\x02\x02\x02B\u0160\x03" +
		"\x02\x02\x02D\u0172\x03\x02\x02\x02F\u01AA\x03\x02\x02\x02H\u01BB\x03" +
		"\x02\x02\x02J\u01BD\x03\x02\x02\x02L\u01BF\x03\x02\x02\x02NQ\x05\x04\x03" +
		"\x02OQ\x07B\x02\x02PN\x03\x02\x02\x02PO\x03\x02\x02\x02QT\x03\x02\x02" +
		"\x02RP\x03\x02\x02\x02RS\x03\x02\x02\x02SU\x03\x02\x02\x02TR\x03\x02\x02" +
		"\x02UV\x07-\x02\x02Va\x07G\x02\x02W`\x05\x06\x04\x02X`\x05\n\x06\x02Y" +
		"`\x05\x10\t\x02Z`\x05\x12\n\x02[`\x05\b\x05\x02\\`\x05\x14\v\x02]`\x05" +
		"\x16\f\x02^`\x05.\x18\x02_W\x03\x02\x02\x02_X\x03\x02\x02\x02_Y\x03\x02" +
		"\x02\x02_Z\x03\x02\x02\x02_[\x03\x02\x02\x02_\\\x03\x02\x02\x02_]\x03" +
		"\x02\x02\x02_^\x03\x02\x02\x02`c\x03\x02\x02\x02a_\x03\x02\x02\x02ab\x03" +
		"\x02\x02\x02bd\x03\x02\x02\x02ca\x03\x02\x02\x02de\x07H\x02\x02e\x03\x03" +
		"\x02\x02\x02fg\t\x02\x02\x02g\x05\x03\x02\x02\x02hi\x072\x02\x02im\x07" +
		"G\x02\x02jl\x052\x1A\x02kj\x03\x02\x02\x02lo\x03\x02\x02\x02mk\x03\x02" +
		"\x02\x02mn\x03\x02\x02\x02np\x03\x02\x02\x02om\x03\x02\x02\x02pq\x07H" +
		"\x02\x02q\x07\x03\x02\x02\x02rs\x075\x02\x02sw\x07G\x02\x02tv\x056\x1C" +
		"\x02ut\x03\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02" +
		"\x02xz\x03\x02\x02\x02yw\x03\x02\x02\x02z{\x07H\x02\x02{\t\x03\x02\x02" +
		"\x02|\x7F\x078\x02\x02}\x80\x05\f\x07\x02~\x80\x05\x0E\b\x02\x7F}\x03" +
		"\x02\x02\x02\x7F~\x03\x02\x02\x02\x80\v\x03\x02\x02\x02\x81\x93\x07G\x02" +
		"\x02\x82\x8B\x05\x0E\b\x02\x83\x87\x07G\x02\x02\x84\x86\x056\x1C\x02\x85" +
		"\x84\x03\x02\x02\x02\x86\x89\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87" +
		"\x88\x03\x02\x02\x02\x88\x8A\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02\x8A" +
		"\x8C\x07H\x02\x02\x8B\x83\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C" +
		"\x94\x03\x02\x02\x02\x8D\x8F\x056\x1C\x02\x8E\x8D\x03\x02\x02\x02\x8F" +
		"\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91" +
		"\x94\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02\x93\x82\x03\x02\x02\x02\x93" +
		"\x90\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\x07H\x02\x02\x96" +
		"\r\x03\x02\x02\x02\x97\x98\x05L\'\x02\x98\x0F\x03\x02\x02\x02\x99\x9A" +
		"\x074\x02\x02\x9A\x9E\x07G\x02\x02\x9B\x9D\x056\x1C\x02\x9C\x9B\x03\x02" +
		"\x02\x02\x9D\xA0\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02" +
		"\x02\x02\x9F\xA1\x03\x02\x02\x02\xA0\x9E\x03\x02\x02\x02\xA1\xA2\x07H" +
		"\x02\x02\xA2\x11\x03\x02\x02\x02\xA3\xA4\x076\x02\x02\xA4\xA8\x07G\x02" +
		"\x02\xA5\xA7\x056\x1C\x02\xA6\xA5\x03\x02\x02\x02\xA7\xAA\x03\x02\x02" +
		"\x02\xA8\xA6\x03\x02\x02\x02\xA8\xA9\x03\x02\x02\x02\xA9\xAB\x03\x02\x02" +
		"\x02\xAA\xA8\x03\x02\x02\x02\xAB\xAC\x07H\x02\x02\xAC\x13\x03\x02\x02" +
		"\x02\xAD\xAE\x077\x02\x02\xAE\xB2\x07G\x02\x02\xAF\xB1\x056\x1C\x02\xB0" +
		"\xAF\x03\x02\x02\x02\xB1\xB4\x03\x02\x02\x02\xB2\xB0\x03\x02\x02\x02\xB2" +
		"\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB5" +
		"\xB6\x07H\x02\x02\xB6\x15\x03\x02\x02\x02\xB7\xB8\t\x03\x02\x02\xB8\xBC" +
		"\x07G\x02\x02\xB9\xBB\x05\x18\r\x02\xBA\xB9\x03\x02\x02\x02\xBB\xBE\x03" +
		"\x02\x02\x02\xBC\xBA\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBF\x03" +
		"\x02\x02\x02\xBE\xBC\x03\x02\x02\x02\xBF\xC0\x07H\x02\x02\xC0\x17\x03" +
		"\x02\x02\x02\xC1\xC7\x070\x02\x02\xC2\xC4\x07E\x02\x02\xC3\xC5\x05\x1A" +
		"\x0E\x02\xC4\xC3\x03\x02\x02\x02\xC4\xC5\x03\x02\x02\x02\xC5\xC6\x03\x02" +
		"\x02\x02\xC6\xC8\x07F\x02\x02\xC7\xC2\x03\x02\x02\x02\xC7\xC8\x03\x02" +
		"\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xD5\x07G\x02\x02\xCA\xD4\x05\x06" +
		"\x04\x02\xCB\xD4\x05$\x13\x02\xCC\xD4\x05\x10\t\x02\xCD\xD4\x05\n\x06" +
		"\x02\xCE\xD4\x05&\x14\x02\xCF\xD4\x05\x16\f\x02\xD0\xD4\x05\x1E\x10\x02" +
		"\xD1\xD4\x05.\x18\x02\xD2\xD4\x05\x1C\x0F\x02\xD3\xCA\x03\x02\x02\x02" +
		"\xD3\xCB\x03\x02\x02\x02\xD3\xCC\x03\x02\x02\x02\xD3\xCD\x03\x02\x02\x02" +
		"\xD3\xCE\x03\x02\x02\x02\xD3\xCF\x03\x02\x02\x02\xD3\xD0\x03\x02\x02\x02" +
		"\xD3\xD1\x03\x02\x02\x02\xD3\xD2\x03\x02\x02\x02\xD4\xD7\x03\x02\x02\x02" +
		"\xD5\xD3\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD8\x03\x02\x02\x02" +
		"\xD7\xD5\x03\x02\x02\x02\xD8\xD9\x07H\x02\x02\xD9\x19\x03\x02\x02\x02" +
		"\xDA\xDB\x07,\x02\x02\xDB\x1B\x03\x02\x02\x02\xDC\xDD\x07?\x02\x02\xDD" +
		"\xDE\x07*\x02\x02\xDE\x1D\x03\x02\x02\x02\xDF\xE0\x071\x02\x02\xE0\xE4" +
		"\x07G\x02\x02\xE1\xE3\x05 \x11\x02\xE2\xE1\x03\x02\x02\x02\xE3\xE6\x03" +
		"\x02\x02\x02\xE4\xE2\x03\x02\x02\x02\xE4\xE5\x03\x02\x02\x02\xE5\xE7\x03" +
		"\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE7\xE8\x07H\x02\x02\xE8\x1F\x03" +
		"\x02\x02\x02\xE9\xEC\x05\"\x12\x02\xEA\xEC\x056\x1C\x02\xEB\xE9\x03\x02" +
		"\x02\x02\xEB\xEA\x03\x02\x02\x02\xEC!\x03\x02\x02\x02\xED\xEE\x07@\x02" +
		"\x02\xEE#\x03\x02\x02\x02\xEF\xF0\x073\x02\x02\xF0\xF4\x07G\x02\x02\xF1" +
		"\xF3\x056\x1C\x02\xF2\xF1\x03\x02\x02\x02\xF3\xF6\x03\x02\x02\x02\xF4" +
		"\xF2\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02\xF5\xF7\x03\x02\x02\x02\xF6" +
		"\xF4\x03\x02\x02\x02\xF7\xF8\x07H\x02\x02\xF8%\x03\x02\x02\x02\xF9\xFA" +
		"\x07:\x02\x02\xFA\u0100\x07G\x02\x02\xFB\xFF\x056\x1C\x02\xFC\xFF\x05" +
		"(\x15\x02\xFD\xFF\x05,\x17\x02\xFE\xFB\x03\x02\x02\x02\xFE\xFC\x03\x02" +
		"\x02\x02\xFE\xFD\x03\x02\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\xFE\x03" +
		"\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0103\x03\x02\x02\x02\u0102" +
		"\u0100\x03\x02\x02\x02\u0103\u0104\x07H\x02\x02\u0104\'\x03\x02\x02\x02" +
		"\u0105\u0106\x05*\x16\x02\u0106\u010C\x07G\x02\x02\u0107\u010B\x056\x1C" +
		"\x02\u0108\u010B\x05(\x15\x02\u0109\u010B\x05,\x17\x02\u010A\u0107\x03" +
		"\x02\x02\x02\u010A\u0108\x03\x02\x02\x02\u010A\u0109\x03\x02\x02\x02\u010B" +
		"\u010E\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010C\u010D\x03\x02" +
		"\x02\x02\u010D\u010F\x03\x02\x02\x02\u010E\u010C\x03\x02\x02\x02\u010F" +
		"\u0110\x07H\x02\x02\u0110)\x03\x02\x02\x02\u0111\u0112\t\x04\x02\x02\u0112" +
		"+\x03\x02\x02\x02\u0113\u0114\x07>\x02\x02\u0114\u0115\x07G\x02\x02\u0115" +
		"\u0116\x05D#\x02\u0116\u0117\x07H\x02\x02\u0117-\x03\x02\x02\x02\u0118" +
		"\u0119\x079\x02\x02\u0119\u011D\x07G\x02\x02\u011A\u011C\x050\x19\x02" +
		"\u011B\u011A\x03\x02\x02\x02\u011C\u011F\x03\x02\x02\x02\u011D\u011B\x03" +
		"\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E\u0120\x03\x02\x02\x02\u011F" +
		"\u011D\x03\x02\x02\x02\u0120\u0121\x07H\x02\x02\u0121/\x03\x02\x02\x02" +
		"\u0122\u0123\x05L\'\x02\u0123\u0127\x07G\x02\x02\u0124\u0126\x05 \x11" +
		"\x02\u0125\u0124\x03\x02\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127\u0125" +
		"\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u012A\x03\x02\x02\x02" +
		"\u0129\u0127\x03\x02\x02\x02\u012A\u012B\x07H\x02\x02\u012B1\x03\x02\x02" +
		"\x02\u012C\u012D\x054\x1B\x02\u012D\u012E\x07O\x02\x02\u012E\u012F\x05" +
		"D#\x02\u012F3\x03\x02\x02\x02\u0130\u0131\x05L\'\x02\u01315\x03\x02\x02" +
		"\x02\u0132\u0136\x05:\x1E\x02\u0133\u0136\x05<\x1F\x02\u0134\u0136\x05" +
		"8\x1D\x02\u0135\u0132\x03\x02\x02\x02\u0135\u0133\x03\x02\x02\x02\u0135" +
		"\u0134\x03\x02\x02\x02\u0136\u0138\x03\x02\x02\x02\u0137\u0139\x07\x03" +
		"\x02\x02\u0138\u0137\x03\x02\x02\x02\u0138\u0139\x03\x02\x02\x02\u0139" +
		"7\x03\x02\x02\x02\u013A\u013B\x05<\x1F\x02\u013B\u013F\x07G\x02\x02\u013C" +
		"\u013E\x05 \x11\x02\u013D\u013C\x03\x02\x02\x02\u013E\u0141\x03\x02\x02" +
		"\x02\u013F\u013D\x03\x02\x02\x02\u013F\u0140\x03\x02\x02\x02\u0140\u0142" +
		"\x03\x02\x02\x02\u0141\u013F\x03\x02\x02\x02\u0142\u0143\x07H\x02\x02" +
		"\u01439\x03\x02\x02\x02\u0144\u0145\x05L\'\x02\u0145\u0146\x05> \x02\u0146" +
		";\x03\x02\x02\x02\u0147\u0148\x05L\'\x02\u0148\u014A\x07E\x02\x02\u0149" +
		"\u014B\x05> \x02\u014A\u0149\x03\x02\x02\x02\u014A\u014B\x03\x02\x02\x02" +
		"\u014B\u014C\x03\x02\x02\x02\u014C\u014D\x07F\x02\x02\u014D=\x03\x02\x02" +
		"\x02\u014E\u0153\x05@!\x02\u014F\u0150\x07L\x02\x02\u0150\u0152\x05@!" +
		"\x02\u0151\u014F\x03\x02\x02\x02\u0152\u0155\x03\x02\x02\x02\u0153\u0151" +
		"\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154\u0157\x03\x02\x02\x02" +
		"\u0155\u0153\x03\x02\x02\x02\u0156\u0158\x07L\x02\x02\u0157\u0156\x03" +
		"\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158?\x03\x02\x02\x02\u0159" +
		"\u015A\x05B\"\x02\u015A\u015B\x07K\x02\x02\u015B\u015C\x05D#\x02\u015C" +
		"\u015F\x03\x02\x02\x02\u015D\u015F\x05D#\x02\u015E\u0159\x03\x02\x02\x02" +
		"\u015E\u015D\x03\x02\x02\x02\u015FA\x03\x02\x02\x02\u0160\u0161\x05L\'" +
		"\x02\u0161C\x03\x02\x02\x02\u0162\u0163\b#\x01\x02\u0163\u0173\x05H%\x02" +
		"\u0164\u0166\x07I\x02\x02\u0165\u0167\x05F$\x02\u0166\u0165\x03\x02\x02" +
		"\x02\u0166\u0167\x03\x02\x02\x02\u0167\u0168\x03\x02\x02\x02\u0168\u0173" +
		"\x07J\x02\x02\u0169\u016A\x05L\'\x02\u016A\u016B\x07K\x02\x02\u016B\u016C" +
		"\x05D#\x12\u016C\u0173\x03\x02\x02\x02\u016D\u0173\x05<\x1F\x02\u016E" +
		"\u016F\t\x05\x02\x02\u016F\u0173\x05D#\x0F\u0170\u0171\t\x06\x02\x02\u0171" +
		"\u0173\x05D#\x0E\u0172\u0162\x03\x02\x02\x02\u0172\u0164\x03\x02\x02\x02" +
		"\u0172\u0169\x03\x02\x02\x02\u0172\u016D\x03\x02\x02\x02\u0172\u016E\x03" +
		"\x02\x02\x02\u0172\u0170\x03\x02\x02\x02\u0173\u01A7\x03\x02\x02\x02\u0174" +
		"\u0175\f\r\x02\x02\u0175\u0176\t\x07\x02\x02\u0176\u01A6\x05D#\x0E\u0177" +
		"\u0178\f\f\x02\x02\u0178\u0179\t\b\x02\x02\u0179\u01A6\x05D#\r\u017A\u017B" +
		"\f\v\x02\x02\u017B\u017C\t\t\x02\x02\u017C\u01A6\x05D#\f\u017D\u017E\f" +
		"\n\x02\x02\u017E\u017F\t\n\x02\x02\u017F\u01A6\x05D#\v\u0180\u0181\f\t" +
		"\x02\x02\u0181\u0182\x07\x13\x02\x02\u0182\u01A6\x05D#\n\u0183\u0184\f" +
		"\b\x02\x02\u0184\u0185\x07\x14\x02\x02\u0185\u01A6\x05D#\t\u0186\u0187" +
		"\f\x07\x02\x02\u0187\u0188\x07\x15\x02\x02\u0188\u01A6\x05D#\b\u0189\u018A" +
		"\f\x06\x02\x02\u018A\u018B\x07\x16\x02\x02\u018B\u01A6\x05D#\x07\u018C" +
		"\u018D\f\x05\x02\x02\u018D\u018E\x07\x17\x02\x02\u018E\u01A6\x05D#\x06" +
		"\u018F\u0190\f\x04\x02\x02\u0190\u0191\x07\x18\x02\x02\u0191\u0192\x05" +
		"D#\x02\u0192\u0193\x07K\x02\x02\u0193\u0194\x05D#\x05\u0194\u01A6\x03" +
		"\x02\x02\x02\u0195\u0196\f\x03\x02\x02\u0196\u0197\t\v\x02\x02\u0197\u01A6" +
		"\x05D#\x03\u0198\u0199\f\x15\x02\x02\u0199\u019C\x07M\x02\x02\u019A\u019D" +
		"\x05L\'\x02\u019B\u019D\x05<\x1F\x02\u019C\u019A\x03\x02\x02\x02\u019C" +
		"\u019B\x03\x02\x02\x02\u019D\u01A6\x03\x02\x02\x02\u019E\u019F\f\x14\x02" +
		"\x02\u019F\u01A0\x07I\x02\x02\u01A0\u01A1\x05D#\x02\u01A1\u01A2\x07J\x02" +
		"\x02\u01A2\u01A6\x03\x02\x02\x02\u01A3\u01A4\f\x10\x02\x02\u01A4\u01A6" +
		"\t\f\x02\x02\u01A5\u0174\x03\x02\x02\x02\u01A5\u0177\x03\x02\x02\x02\u01A5" +
		"\u017A\x03\x02\x02\x02\u01A5\u017D\x03\x02\x02\x02\u01A5\u0180\x03\x02" +
		"\x02\x02\u01A5\u0183\x03\x02\x02\x02\u01A5\u0186\x03\x02\x02\x02\u01A5" +
		"\u0189\x03\x02\x02\x02\u01A5\u018C\x03\x02\x02\x02\u01A5\u018F\x03\x02" +
		"\x02\x02\u01A5\u0195\x03\x02\x02\x02\u01A5\u0198\x03\x02\x02\x02\u01A5" +
		"\u019E\x03\x02\x02\x02\u01A5\u01A3\x03\x02\x02\x02\u01A6\u01A9\x03\x02" +
		"\x02\x02\u01A7\u01A5\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8" +
		"E\x03\x02\x02\x02\u01A9\u01A7\x03\x02\x02\x02\u01AA\u01AF\x05D#\x02\u01AB" +
		"\u01AC\x07L\x02\x02\u01AC\u01AE\x05D#\x02\u01AD\u01AB\x03\x02\x02\x02" +
		"\u01AE\u01B1\x03\x02\x02\x02\u01AF\u01AD\x03\x02\x02\x02\u01AF\u01B0\x03" +
		"\x02\x02\x02\u01B0\u01B3\x03\x02\x02\x02\u01B1\u01AF\x03\x02\x02\x02\u01B2" +
		"\u01B4\x07L\x02\x02\u01B3\u01B2\x03\x02\x02\x02\u01B3\u01B4\x03\x02\x02" +
		"\x02\u01B4G\x03\x02\x02\x02\u01B5\u01B6\x07E\x02\x02\u01B6\u01B7\x05D" +
		"#\x02\u01B7\u01B8\x07F\x02\x02\u01B8\u01BC\x03\x02\x02\x02\u01B9\u01BC" +
		"\x05J&\x02\u01BA\u01BC\x05L\'\x02\u01BB\u01B5\x03\x02\x02\x02\u01BB\u01B9" +
		"\x03\x02\x02\x02\u01BB\u01BA\x03\x02\x02\x02\u01BCI\x03\x02\x02\x02\u01BD" +
		"\u01BE\t\r\x02\x02\u01BEK\x03\x02\x02\x02\u01BF\u01C0\t\x0E\x02\x02\u01C0" +
		"M\x03\x02\x02\x02-PR_amw\x7F\x87\x8B\x90\x93\x9E\xA8\xB2\xBC\xC4\xC7\xD3" +
		"\xD5\xE4\xEB\xF4\xFE\u0100\u010A\u010C\u011D\u0127\u0135\u0138\u013F\u014A" +
		"\u0153\u0157\u015E\u0166\u0172\u019C\u01A5\u01A7\u01AF\u01B3\u01BB";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!jenkinsfileParser.__ATN) {
			jenkinsfileParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(jenkinsfileParser._serializedATN));
		}

		return jenkinsfileParser.__ATN;
	}

}

export class PipelineContext extends ParserRuleContext {
	public PIPELINE(): TerminalNode { return this.getToken(jenkinsfileParser.PIPELINE, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public groovy_definition(): Groovy_definitionContext[];
	public groovy_definition(i: number): Groovy_definitionContext;
	public groovy_definition(i?: number): Groovy_definitionContext | Groovy_definitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Groovy_definitionContext);
		} else {
			return this.getRuleContext(i, Groovy_definitionContext);
		}
	}
	public JENKINSFILE_DECLARATIVE(): TerminalNode[];
	public JENKINSFILE_DECLARATIVE(i: number): TerminalNode;
	public JENKINSFILE_DECLARATIVE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(jenkinsfileParser.JENKINSFILE_DECLARATIVE);
		} else {
			return this.getToken(jenkinsfileParser.JENKINSFILE_DECLARATIVE, i);
		}
	}
	public environment(): EnvironmentContext[];
	public environment(i: number): EnvironmentContext;
	public environment(i?: number): EnvironmentContext | EnvironmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnvironmentContext);
		} else {
			return this.getRuleContext(i, EnvironmentContext);
		}
	}
	public agent(): AgentContext[];
	public agent(i: number): AgentContext;
	public agent(i?: number): AgentContext | AgentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AgentContext);
		} else {
			return this.getRuleContext(i, AgentContext);
		}
	}
	public tools(): ToolsContext[];
	public tools(i: number): ToolsContext;
	public tools(i?: number): ToolsContext | ToolsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ToolsContext);
		} else {
			return this.getRuleContext(i, ToolsContext);
		}
	}
	public pipeline_options(): Pipeline_optionsContext[];
	public pipeline_options(i: number): Pipeline_optionsContext;
	public pipeline_options(i?: number): Pipeline_optionsContext | Pipeline_optionsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Pipeline_optionsContext);
		} else {
			return this.getRuleContext(i, Pipeline_optionsContext);
		}
	}
	public parameters(): ParametersContext[];
	public parameters(i: number): ParametersContext;
	public parameters(i?: number): ParametersContext | ParametersContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParametersContext);
		} else {
			return this.getRuleContext(i, ParametersContext);
		}
	}
	public triggers(): TriggersContext[];
	public triggers(i: number): TriggersContext;
	public triggers(i?: number): TriggersContext | TriggersContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TriggersContext);
		} else {
			return this.getRuleContext(i, TriggersContext);
		}
	}
	public stages(): StagesContext[];
	public stages(i: number): StagesContext;
	public stages(i?: number): StagesContext | StagesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StagesContext);
		} else {
			return this.getRuleContext(i, StagesContext);
		}
	}
	public post(): PostContext[];
	public post(i: number): PostContext;
	public post(i?: number): PostContext | PostContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PostContext);
		} else {
			return this.getRuleContext(i, PostContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_pipeline; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterPipeline) {
			listener.enterPipeline(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitPipeline) {
			listener.exitPipeline(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitPipeline) {
			return visitor.visitPipeline(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Groovy_definitionContext extends ParserRuleContext {
	public DEF_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.DEF_LITERAL, 0); }
	public LIBRARY_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.LIBRARY_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_groovy_definition; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterGroovy_definition) {
			listener.enterGroovy_definition(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitGroovy_definition) {
			listener.exitGroovy_definition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitGroovy_definition) {
			return visitor.visitGroovy_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnvironmentContext extends ParserRuleContext {
	public ENVIRONMENT(): TerminalNode { return this.getToken(jenkinsfileParser.ENVIRONMENT, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public assignment(): AssignmentContext[];
	public assignment(i: number): AssignmentContext;
	public assignment(i?: number): AssignmentContext | AssignmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AssignmentContext);
		} else {
			return this.getRuleContext(i, AssignmentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_environment; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterEnvironment) {
			listener.enterEnvironment(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitEnvironment) {
			listener.exitEnvironment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitEnvironment) {
			return visitor.visitEnvironment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	public PARAMETERS(): TerminalNode { return this.getToken(jenkinsfileParser.PARAMETERS, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_parameters; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterParameters) {
			listener.enterParameters(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitParameters) {
			listener.exitParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AgentContext extends ParserRuleContext {
	public AGENT(): TerminalNode { return this.getToken(jenkinsfileParser.AGENT, 0); }
	public agent_section(): Agent_sectionContext | undefined {
		return this.tryGetRuleContext(0, Agent_sectionContext);
	}
	public agent_type(): Agent_typeContext | undefined {
		return this.tryGetRuleContext(0, Agent_typeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_agent; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterAgent) {
			listener.enterAgent(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitAgent) {
			listener.exitAgent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitAgent) {
			return visitor.visitAgent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Agent_sectionContext extends ParserRuleContext {
	public LBRACE(): TerminalNode[];
	public LBRACE(i: number): TerminalNode;
	public LBRACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(jenkinsfileParser.LBRACE);
		} else {
			return this.getToken(jenkinsfileParser.LBRACE, i);
		}
	}
	public RBRACE(): TerminalNode[];
	public RBRACE(i: number): TerminalNode;
	public RBRACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(jenkinsfileParser.RBRACE);
		} else {
			return this.getToken(jenkinsfileParser.RBRACE, i);
		}
	}
	public agent_type(): Agent_typeContext | undefined {
		return this.tryGetRuleContext(0, Agent_typeContext);
	}
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_agent_section; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterAgent_section) {
			listener.enterAgent_section(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitAgent_section) {
			listener.exitAgent_section(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitAgent_section) {
			return visitor.visitAgent_section(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Agent_typeContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_agent_type; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterAgent_type) {
			listener.enterAgent_type(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitAgent_type) {
			listener.exitAgent_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitAgent_type) {
			return visitor.visitAgent_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ToolsContext extends ParserRuleContext {
	public TOOLS(): TerminalNode { return this.getToken(jenkinsfileParser.TOOLS, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_tools; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterTools) {
			listener.enterTools(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitTools) {
			listener.exitTools(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitTools) {
			return visitor.visitTools(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Pipeline_optionsContext extends ParserRuleContext {
	public OPTIONS(): TerminalNode { return this.getToken(jenkinsfileParser.OPTIONS, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_pipeline_options; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterPipeline_options) {
			listener.enterPipeline_options(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitPipeline_options) {
			listener.exitPipeline_options(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitPipeline_options) {
			return visitor.visitPipeline_options(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriggersContext extends ParserRuleContext {
	public TRIGGERS(): TerminalNode { return this.getToken(jenkinsfileParser.TRIGGERS, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_triggers; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterTriggers) {
			listener.enterTriggers(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitTriggers) {
			listener.exitTriggers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitTriggers) {
			return visitor.visitTriggers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StagesContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public STAGES(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.STAGES, 0); }
	public PARALLEL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.PARALLEL, 0); }
	public stage_definition(): Stage_definitionContext[];
	public stage_definition(i: number): Stage_definitionContext;
	public stage_definition(i?: number): Stage_definitionContext | Stage_definitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Stage_definitionContext);
		} else {
			return this.getRuleContext(i, Stage_definitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_stages; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterStages) {
			listener.enterStages(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitStages) {
			listener.exitStages(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitStages) {
			return visitor.visitStages(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Stage_definitionContext extends ParserRuleContext {
	public STAGE(): TerminalNode { return this.getToken(jenkinsfileParser.STAGE, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.RPAREN, 0); }
	public environment(): EnvironmentContext[];
	public environment(i: number): EnvironmentContext;
	public environment(i?: number): EnvironmentContext | EnvironmentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnvironmentContext);
		} else {
			return this.getRuleContext(i, EnvironmentContext);
		}
	}
	public input(): InputContext[];
	public input(i: number): InputContext;
	public input(i?: number): InputContext | InputContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InputContext);
		} else {
			return this.getRuleContext(i, InputContext);
		}
	}
	public tools(): ToolsContext[];
	public tools(i: number): ToolsContext;
	public tools(i?: number): ToolsContext | ToolsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ToolsContext);
		} else {
			return this.getRuleContext(i, ToolsContext);
		}
	}
	public agent(): AgentContext[];
	public agent(i: number): AgentContext;
	public agent(i?: number): AgentContext | AgentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AgentContext);
		} else {
			return this.getRuleContext(i, AgentContext);
		}
	}
	public when(): WhenContext[];
	public when(i: number): WhenContext;
	public when(i?: number): WhenContext | WhenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WhenContext);
		} else {
			return this.getRuleContext(i, WhenContext);
		}
	}
	public stages(): StagesContext[];
	public stages(i: number): StagesContext;
	public stages(i?: number): StagesContext | StagesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StagesContext);
		} else {
			return this.getRuleContext(i, StagesContext);
		}
	}
	public steps(): StepsContext[];
	public steps(i: number): StepsContext;
	public steps(i?: number): StepsContext | StepsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StepsContext);
		} else {
			return this.getRuleContext(i, StepsContext);
		}
	}
	public post(): PostContext[];
	public post(i: number): PostContext;
	public post(i?: number): PostContext | PostContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PostContext);
		} else {
			return this.getRuleContext(i, PostContext);
		}
	}
	public fail_fast(): Fail_fastContext[];
	public fail_fast(i: number): Fail_fastContext;
	public fail_fast(i?: number): Fail_fastContext | Fail_fastContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Fail_fastContext);
		} else {
			return this.getRuleContext(i, Fail_fastContext);
		}
	}
	public stage_name(): Stage_nameContext | undefined {
		return this.tryGetRuleContext(0, Stage_nameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_stage_definition; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterStage_definition) {
			listener.enterStage_definition(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitStage_definition) {
			listener.exitStage_definition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitStage_definition) {
			return visitor.visitStage_definition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Stage_nameContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(jenkinsfileParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_stage_name; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterStage_name) {
			listener.enterStage_name(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitStage_name) {
			listener.exitStage_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitStage_name) {
			return visitor.visitStage_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fail_fastContext extends ParserRuleContext {
	public FAIL_FAST(): TerminalNode { return this.getToken(jenkinsfileParser.FAIL_FAST, 0); }
	public BOOL_LITERAL(): TerminalNode { return this.getToken(jenkinsfileParser.BOOL_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_fail_fast; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterFail_fast) {
			listener.enterFail_fast(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitFail_fast) {
			listener.exitFail_fast(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitFail_fast) {
			return visitor.visitFail_fast(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StepsContext extends ParserRuleContext {
	public STEPS(): TerminalNode { return this.getToken(jenkinsfileParser.STEPS, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public step(): StepContext[];
	public step(i: number): StepContext;
	public step(i?: number): StepContext | StepContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StepContext);
		} else {
			return this.getRuleContext(i, StepContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_steps; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterSteps) {
			listener.enterSteps(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitSteps) {
			listener.exitSteps(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitSteps) {
			return visitor.visitSteps(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StepContext extends ParserRuleContext {
	public script(): ScriptContext | undefined {
		return this.tryGetRuleContext(0, ScriptContext);
	}
	public method_call(): Method_callContext | undefined {
		return this.tryGetRuleContext(0, Method_callContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_step; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterStep) {
			listener.enterStep(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitStep) {
			listener.exitStep(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitStep) {
			return visitor.visitStep(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScriptContext extends ParserRuleContext {
	public SCRIPT_LITERAL(): TerminalNode { return this.getToken(jenkinsfileParser.SCRIPT_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_script; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterScript) {
			listener.enterScript(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitScript) {
			listener.exitScript(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitScript) {
			return visitor.visitScript(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InputContext extends ParserRuleContext {
	public INPUT(): TerminalNode { return this.getToken(jenkinsfileParser.INPUT, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_input; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterInput) {
			listener.enterInput(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitInput) {
			listener.exitInput(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitInput) {
			return visitor.visitInput(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhenContext extends ParserRuleContext {
	public WHEN(): TerminalNode { return this.getToken(jenkinsfileParser.WHEN, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	public when_aggregation(): When_aggregationContext[];
	public when_aggregation(i: number): When_aggregationContext;
	public when_aggregation(i?: number): When_aggregationContext | When_aggregationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(When_aggregationContext);
		} else {
			return this.getRuleContext(i, When_aggregationContext);
		}
	}
	public when_expression(): When_expressionContext[];
	public when_expression(i: number): When_expressionContext;
	public when_expression(i?: number): When_expressionContext | When_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(When_expressionContext);
		} else {
			return this.getRuleContext(i, When_expressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_when; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterWhen) {
			listener.enterWhen(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitWhen) {
			listener.exitWhen(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitWhen) {
			return visitor.visitWhen(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class When_aggregationContext extends ParserRuleContext {
	public when_aggregation_type(): When_aggregation_typeContext {
		return this.getRuleContext(0, When_aggregation_typeContext);
	}
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public method_call(): Method_callContext[];
	public method_call(i: number): Method_callContext;
	public method_call(i?: number): Method_callContext | Method_callContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_callContext);
		} else {
			return this.getRuleContext(i, Method_callContext);
		}
	}
	public when_aggregation(): When_aggregationContext[];
	public when_aggregation(i: number): When_aggregationContext;
	public when_aggregation(i?: number): When_aggregationContext | When_aggregationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(When_aggregationContext);
		} else {
			return this.getRuleContext(i, When_aggregationContext);
		}
	}
	public when_expression(): When_expressionContext[];
	public when_expression(i: number): When_expressionContext;
	public when_expression(i?: number): When_expressionContext | When_expressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(When_expressionContext);
		} else {
			return this.getRuleContext(i, When_expressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_when_aggregation; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterWhen_aggregation) {
			listener.enterWhen_aggregation(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitWhen_aggregation) {
			listener.exitWhen_aggregation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitWhen_aggregation) {
			return visitor.visitWhen_aggregation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class When_aggregation_typeContext extends ParserRuleContext {
	public ALLOF(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ALLOF, 0); }
	public ANYOF(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ANYOF, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_when_aggregation_type; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterWhen_aggregation_type) {
			listener.enterWhen_aggregation_type(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitWhen_aggregation_type) {
			listener.exitWhen_aggregation_type(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitWhen_aggregation_type) {
			return visitor.visitWhen_aggregation_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class When_expressionContext extends ParserRuleContext {
	public EXPRESSION(): TerminalNode { return this.getToken(jenkinsfileParser.EXPRESSION, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_when_expression; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterWhen_expression) {
			listener.enterWhen_expression(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitWhen_expression) {
			listener.exitWhen_expression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitWhen_expression) {
			return visitor.visitWhen_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostContext extends ParserRuleContext {
	public POST(): TerminalNode { return this.getToken(jenkinsfileParser.POST, 0); }
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public post_condition(): Post_conditionContext[];
	public post_condition(i: number): Post_conditionContext;
	public post_condition(i?: number): Post_conditionContext | Post_conditionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Post_conditionContext);
		} else {
			return this.getRuleContext(i, Post_conditionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_post; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterPost) {
			listener.enterPost(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitPost) {
			listener.exitPost(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitPost) {
			return visitor.visitPost(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Post_conditionContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public step(): StepContext[];
	public step(i: number): StepContext;
	public step(i?: number): StepContext | StepContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StepContext);
		} else {
			return this.getRuleContext(i, StepContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_post_condition; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterPost_condition) {
			listener.enterPost_condition(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitPost_condition) {
			listener.exitPost_condition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitPost_condition) {
			return visitor.visitPost_condition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	public assignment_key(): Assignment_keyContext {
		return this.getRuleContext(0, Assignment_keyContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(jenkinsfileParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_assignment; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterAssignment) {
			listener.enterAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitAssignment) {
			listener.exitAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_keyContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_assignment_key; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterAssignment_key) {
			listener.enterAssignment_key(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitAssignment_key) {
			listener.exitAssignment_key(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitAssignment_key) {
			return visitor.visitAssignment_key(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_callContext extends ParserRuleContext {
	public method_call_simple(): Method_call_simpleContext | undefined {
		return this.tryGetRuleContext(0, Method_call_simpleContext);
	}
	public method_call_java(): Method_call_javaContext | undefined {
		return this.tryGetRuleContext(0, Method_call_javaContext);
	}
	public method_environment(): Method_environmentContext | undefined {
		return this.tryGetRuleContext(0, Method_environmentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_call; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_call) {
			listener.enterMethod_call(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_call) {
			listener.exitMethod_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_call) {
			return visitor.visitMethod_call(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_environmentContext extends ParserRuleContext {
	public method_call_java(): Method_call_javaContext {
		return this.getRuleContext(0, Method_call_javaContext);
	}
	public LBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(jenkinsfileParser.RBRACE, 0); }
	public step(): StepContext[];
	public step(i: number): StepContext;
	public step(i?: number): StepContext | StepContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StepContext);
		} else {
			return this.getRuleContext(i, StepContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_environment; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_environment) {
			listener.enterMethod_environment(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_environment) {
			listener.exitMethod_environment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_environment) {
			return visitor.visitMethod_environment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_call_simpleContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public method_arg_list(): Method_arg_listContext {
		return this.getRuleContext(0, Method_arg_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_call_simple; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_call_simple) {
			listener.enterMethod_call_simple(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_call_simple) {
			listener.exitMethod_call_simple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_call_simple) {
			return visitor.visitMethod_call_simple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_call_javaContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(jenkinsfileParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(jenkinsfileParser.RPAREN, 0); }
	public method_arg_list(): Method_arg_listContext | undefined {
		return this.tryGetRuleContext(0, Method_arg_listContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_call_java; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_call_java) {
			listener.enterMethod_call_java(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_call_java) {
			listener.exitMethod_call_java(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_call_java) {
			return visitor.visitMethod_call_java(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_arg_listContext extends ParserRuleContext {
	public method_arg(): Method_argContext[];
	public method_arg(i: number): Method_argContext;
	public method_arg(i?: number): Method_argContext | Method_argContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Method_argContext);
		} else {
			return this.getRuleContext(i, Method_argContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(jenkinsfileParser.COMMA);
		} else {
			return this.getToken(jenkinsfileParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_arg_list; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_arg_list) {
			listener.enterMethod_arg_list(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_arg_list) {
			listener.exitMethod_arg_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_arg_list) {
			return visitor.visitMethod_arg_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_argContext extends ParserRuleContext {
	public method_arg_key(): Method_arg_keyContext | undefined {
		return this.tryGetRuleContext(0, Method_arg_keyContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.COLON, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_arg; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_arg) {
			listener.enterMethod_arg(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_arg) {
			listener.exitMethod_arg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_arg) {
			return visitor.visitMethod_arg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Method_arg_keyContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_method_arg_key; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterMethod_arg_key) {
			listener.enterMethod_arg_key(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitMethod_arg_key) {
			listener.exitMethod_arg_key(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitMethod_arg_key) {
			return visitor.visitMethod_arg_key(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _prefix!: Token;
	public _postfix!: Token;
	public _bop!: Token;
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.DOT, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public method_call_java(): Method_call_javaContext | undefined {
		return this.tryGetRuleContext(0, Method_call_javaContext);
	}
	public LBRACK(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.LBRACK, 0); }
	public RBRACK(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.RBRACK, 0); }
	public expression_list(): Expression_listContext | undefined {
		return this.tryGetRuleContext(0, Expression_listContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.COLON, 0); }
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.EQUALS, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ASSIGN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_expression; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expression_listContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(jenkinsfileParser.COMMA);
		} else {
			return this.getToken(jenkinsfileParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_expression_list; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterExpression_list) {
			listener.enterExpression_list(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitExpression_list) {
			listener.exitExpression_list(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitExpression_list) {
			return visitor.visitExpression_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.RPAREN, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_primary; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterPrimary) {
			listener.enterPrimary(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitPrimary) {
			listener.exitPrimary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitPrimary) {
			return visitor.visitPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.DECIMAL_LITERAL, 0); }
	public FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.FLOAT_LITERAL, 0); }
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.STRING_LITERAL, 0); }
	public BOOL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.BOOL_LITERAL, 0); }
	public NULL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.NULL_LITERAL, 0); }
	public REGEXP_LITERAL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.REGEXP_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_literal; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.IDENTIFIER, 0); }
	public PIPELINE(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.PIPELINE, 0); }
	public STAGES(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.STAGES, 0); }
	public PARALLEL(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.PARALLEL, 0); }
	public STAGE(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.STAGE, 0); }
	public STEPS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.STEPS, 0); }
	public ENVIRONMENT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ENVIRONMENT, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.INPUT, 0); }
	public TOOLS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.TOOLS, 0); }
	public PARAMETERS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.PARAMETERS, 0); }
	public OPTIONS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.OPTIONS, 0); }
	public TRIGGERS(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.TRIGGERS, 0); }
	public AGENT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.AGENT, 0); }
	public POST(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.POST, 0); }
	public WHEN(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.WHEN, 0); }
	public ANYOF(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ANYOF, 0); }
	public ALLOF(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.ALLOF, 0); }
	public EXPRESSION(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.EXPRESSION, 0); }
	public FAIL_FAST(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.FAIL_FAST, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(jenkinsfileParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return jenkinsfileParser.RULE_identifier; }
	// @Override
	public enterRule(listener: jenkinsfileListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: jenkinsfileListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: jenkinsfileVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


