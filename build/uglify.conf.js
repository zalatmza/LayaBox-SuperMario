module.exports = {
  compress: {
    booleans: true,
    cascade: true,
    conditionals: true,
    comparisons: true,
    dead_code: true,
    drop_debugger: true,
    evaluate: true,
    hoist_funs: true,
    if_return: true,
    join_vars: true,
    loops: true,
    sequences: true,
    toplevel: true,
    warnings: false,
    unused: true
  },

  mangle: {
    toplevel: true
  },

  toplevel: true
}
