/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['NPC Admin'],
  /**
   * Your New Relic license key.
   */
  license_key : '3d1d5bafb0de8531c20ff5bba9fe4fd411866371',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'trace',
    filepath : '/var/log/newrelic/newrelic_agent.log'
  }
};
