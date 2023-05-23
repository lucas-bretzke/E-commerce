<template>
  <div class="input-container">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="keyupEnter"
      placeholder=" "
    />
    <label>{{ label }}</label>
  </div>
  <span class="error"> {{ msgError }}</span>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    modelValue: { type: String, required: true },
    label: { type: String, required: true },
    msgError: { type: String, required: false, default: "" },
    keyupEnter: { type: Event, required: false, default: null },
  },
})
export default class InputText extends Vue {}
</script>


<style lang="less" scoped>
.input-container {
  position: relative;
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    padding: 16px;
    border: 1px solid #ccc;
    background-color: transparent;
    color: #333;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: #000;
    }

    & ~ label {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 16px;
      color: #999;
      transition: all 0.3s;

      &.active {
        top: -8px;
        left: 8px;
        font-size: 12px;
        color: #000;
        background-color: #fff;
        padding: 0 4px;
      }
    }

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      top: -8px;
      left: 8px;
      font-size: 12px;
      color: #000;
      background-color: #fff;
      padding: 0 4px;
    }
  }

  button {
    position: absolute;
    right: 11px;
    width: 33px;
    height: 33px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    color: #444444;
    background-color: transparent;
  }
}

.error {
  position: relative;
  top: -18px;
  color: red;
  font-size: 14px;
}
</style>