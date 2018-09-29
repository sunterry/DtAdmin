export default {
  setCode(state, code) {
    console.log(code);
    /* eslint-disable */
    state.code = code++;
  },
};
