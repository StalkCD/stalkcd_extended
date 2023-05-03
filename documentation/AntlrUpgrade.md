# ANTLR Grammar Update

In TypeScript the ANTLR grammar is not well integrated and therefore it is required to perform several steps when the grammar is changed.

These steps might also be nessesary when the TypeScript version is updated.

1. Downgrade TS to version 2.9.2.
2. Check that the library antlr4ts is on version 0.5.0-alpha.1.
3. Generate the new ANTLR classes using the command (This command can also be found in the file ``package.json``):
   ```
   antlr4ts -visitor path/to/grammar/jenkinsfile.g4
   ```
4. Upgrade to the TS version used.
5. Upgrade to the appropriate `antlr4ts` version
6. Adapt the generated classes to the TS version.
7. Run tests to check the same level of performance before migrating.