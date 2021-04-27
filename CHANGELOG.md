# [2.2.0](https://github.com/anli/rna-task/compare/2.1.0...2.2.0) (2021-04-25)


### Bug Fixes

* **home:** add useEffect to expand when filter is didPreviously ([#87](https://github.com/anli/rna-task/issues/87)) ([e7ee2e5](https://github.com/anli/rna-task/commit/e7ee2e55413223653809bf4d8606340af10c1862)), closes [#79](https://github.com/anli/rna-task/issues/79)
* **home:** fix to show correct flatlist layout ([#89](https://github.com/anli/rna-task/issues/89)) ([5d688f5](https://github.com/anli/rna-task/commit/5d688f54c6aa76de521ce5ee51c3682348bf6479)), closes [#83](https://github.com/anli/rna-task/issues/83)
* **sentry:** disable error reporting in dev mode ([#88](https://github.com/anli/rna-task/issues/88)) ([15c100e](https://github.com/anli/rna-task/commit/15c100ec1d396890b8238b96b497ff9e05a300df))



# [2.1.0](https://github.com/anli/rna-task/compare/2.0.0...2.1.0) (2021-04-24)


### Features

* **app, i18n:** add i18next, i18nexus, translation ([#84](https://github.com/anli/rna-task/issues/84)) ([3a15681](https://github.com/anli/rna-task/commit/3a15681d02ad951d50ebbf5b5f481e5e00f8a184)), closes [#58](https://github.com/anli/rna-task/issues/58)
* **authentication, setting:** add switch account button in Setting Screen ([#73](https://github.com/anli/rna-task/issues/73)) ([324765f](https://github.com/anli/rna-task/commit/324765fc513a01a0262afc642064dfa6a247f6f9)), closes [#41](https://github.com/anli/rna-task/issues/41)
* **home:** add accordion list for completed tasks ([#74](https://github.com/anli/rna-task/issues/74)) ([ac2f0f4](https://github.com/anli/rna-task/commit/ac2f0f42ec63b008ec0826afb5da2f863562149f)), closes [#50](https://github.com/anli/rna-task/issues/50)
* **home:** show toast when task is marked complete or not complete ([#75](https://github.com/anli/rna-task/issues/75)) ([3ddd196](https://github.com/anli/rna-task/commit/3ddd1966f02a3ed4fb8da3ed97b393f033020fb0)), closes [#53](https://github.com/anli/rna-task/issues/53)
* **home, use-filter:** change didYesterday to didPreviously ([#78](https://github.com/anli/rna-task/issues/78)) ([f8d4b5a](https://github.com/anli/rna-task/commit/f8d4b5a098e00481b7e947ea4482f363d3131890)), closes [#72](https://github.com/anli/rna-task/issues/72)
* **setting:** add version check, and link to store URL ([#77](https://github.com/anli/rna-task/issues/77)) ([9533207](https://github.com/anli/rna-task/commit/953320719e7f2e0404abde1eb21bd001790d572e)), closes [#54](https://github.com/anli/rna-task/issues/54)
* **task-name-input:** add processText value to onChange ([#82](https://github.com/anli/rna-task/issues/82)) ([eb380b8](https://github.com/anli/rna-task/commit/eb380b8e0196fad709b24fe3d546dcdf3b91730a)), closes [#57](https://github.com/anli/rna-task/issues/57)



# [2.0.0](https://github.com/anli/rna-task/compare/1.2.0...2.0.0) (2021-04-23)


### Bug Fixes

* **save-button:** change color to background theme color ([#63](https://github.com/anli/rna-task/issues/63)) ([e65a91e](https://github.com/anli/rna-task/commit/e65a91ef0afb259192cbbba59063b4b4d4f12a9d)), closes [#36](https://github.com/anli/rna-task/issues/36)


### Features

* **app:** add bottom tab button for Add Task ([#67](https://github.com/anli/rna-task/issues/67)) ([ad8082a](https://github.com/anli/rna-task/commit/ad8082a2a9df42fff3bfb56de14d1eb4a7cd4e90)), closes [#40](https://github.com/anli/rna-task/issues/40)
* **app:** add react-native-version-check ([#66](https://github.com/anli/rna-task/issues/66)) ([40516fc](https://github.com/anli/rna-task/commit/40516fc7eb4029b09cbf1d944e3ff8a526dbd011)), closes [#39](https://github.com/anli/rna-task/issues/39)
* **date-picker-input, task-name, task-update:** add disable input when task is mark completed ([#69](https://github.com/anli/rna-task/issues/69)) ([009e8b7](https://github.com/anli/rna-task/commit/009e8b72c0b8dc337ecccb900680a9e94ea6fb14)), closes [#51](https://github.com/anli/rna-task/issues/51)
* **date-picker-input, task-update:** add default date to be today ([e406806](https://github.com/anli/rna-task/commit/e4068064744a4b5a56a99d66d30dc2ff8857e088)), closes [#56](https://github.com/anli/rna-task/issues/56)
* **home, filter:** add persistFilter for user at HomeScreen ([#65](https://github.com/anli/rna-task/issues/65)) ([e3ef9fd](https://github.com/anli/rna-task/commit/e3ef9fd8666e09f7af0f62045d2706bd887ef679)), closes [#38](https://github.com/anli/rna-task/issues/38)
* **login:** add loading indicator onLogin ([#60](https://github.com/anli/rna-task/issues/60)) ([cc49ea1](https://github.com/anli/rna-task/commit/cc49ea1783494956cda82efd08b25b075d016234)), closes [#25](https://github.com/anli/rna-task/issues/25)
* **task-update:** add auto-update at Task Update Screen ([#59](https://github.com/anli/rna-task/issues/59)) ([354e7e0](https://github.com/anli/rna-task/commit/354e7e0a8dcc6aa63acb47ff606e9b9cce61ae75)), closes [#24](https://github.com/anli/rna-task/issues/24)
* **task-update:** change only goBack when mark complete ([#70](https://github.com/anli/rna-task/issues/70)) ([e175b3e](https://github.com/anli/rna-task/commit/e175b3e10b8d7ed8fd943f08f1b1e8adf89ce046)), closes [#52](https://github.com/anli/rna-task/issues/52)


### BREAKING CHANGES

* **app:** show alert to store when breaking version is released



# [1.2.0](https://github.com/anli/rna-task/compare/1.1.0...1.2.0) (2021-04-22)

### Features

- **app:** add StatusBar backgroundColor and barStyle ([#45](https://github.com/anli/rna-task/issues/45)) ([d6f2090](https://github.com/anli/rna-task/commit/d6f2090aadd09c42004ef11f428ef04edae925db)), closes [#26](https://github.com/anli/rna-task/issues/26)
- **home:** add mark as complete or not complete on pressing checkbox ([#44](https://github.com/anli/rna-task/issues/44)) ([ed060a1](https://github.com/anli/rna-task/commit/ed060a1f581e49dea796c709a38dd898fae80fe1)), closes [#20](https://github.com/anli/rna-task/issues/20)
- **home:** add sort for data by isCompleted ([#49](https://github.com/anli/rna-task/issues/49)) ([aee0606](https://github.com/anli/rna-task/commit/aee0606d6d2c389a13b51d8707bba3f55d547621)), closes [#28](https://github.com/anli/rna-task/issues/28)
- **task-name:** add ClearTextButton to TaskNameInput ([#47](https://github.com/anli/rna-task/issues/47)) ([6992b9f](https://github.com/anli/rna-task/commit/6992b9f3b451fb230b27bb1b213e301698520400)), closes [#37](https://github.com/anli/rna-task/issues/37)
- **task-update:** change IsCompleted Input label, onPress update immediately ([#48](https://github.com/anli/rna-task/issues/48)) ([64dd95f](https://github.com/anli/rna-task/commit/64dd95fb13b58506c00972331fcd7033cfd7335e)), closes [#27](https://github.com/anli/rna-task/issues/27)

# [1.1.0](https://github.com/anli/rna-task/compare/5e5a8355b17e3ed72d1cf480b5e9873f22e24d3d...1.1.0) (2021-04-19)

### Bug Fixes

- **home:** fix rules for filter want to do today ([#14](https://github.com/anli/rna-task/issues/14)) ([c88132f](https://github.com/anli/rna-task/commit/c88132fbb6550f1eba5023563dabddd4d1fafb03))

### Features

- **app, task:** add firebase login, crud integration ([5024f97](https://github.com/anli/rna-task/commit/5024f97f91b226f0253ca12ab07dcff8a5716ff6))
- **home:** add filter for tasks ([#9](https://github.com/anli/rna-task/issues/9)) ([b5559a6](https://github.com/anli/rna-task/commit/b5559a6fd688fc7f3d9955ff90eeb22b39b35460))
- **home:** add logout ([#15](https://github.com/anli/rna-task/issues/15)) ([1d0ebe3](https://github.com/anli/rna-task/commit/1d0ebe3fb960bd2893246dae10c3688940cba309))
- **home:** change filter icon, change bottom sheet cancelIndex ([#17](https://github.com/anli/rna-task/issues/17)) ([e3beb2f](https://github.com/anli/rna-task/commit/e3beb2f2c12d921f36342534c7fd902c6782945c))
- **home:** change filter options ([#13](https://github.com/anli/rna-task/issues/13)) ([852a2dd](https://github.com/anli/rna-task/commit/852a2dda9f00e73e68ff3fd761f929240b766c66))
- **home, save-button:** add background color primary to FAB ([#16](https://github.com/anli/rna-task/issues/16)) ([6d6c0b3](https://github.com/anli/rna-task/commit/6d6c0b3ec931037b553638ce8425ba71d41539c6))
- **home, setting:** change logout button to setting screen ([#32](https://github.com/anli/rna-task/issues/32)) ([65fcc72](https://github.com/anli/rna-task/commit/65fcc72f839e8ae4a741c949ec780891c804cfd1)), closes [#31](https://github.com/anli/rna-task/issues/31)
- **home, task-add, task-update:** add date input ([#8](https://github.com/anli/rna-task/issues/8)) ([7355305](https://github.com/anli/rna-task/commit/735530514b66585211929c45f20a6a2f4b4e8af2))
- **login, loading:** add google login for firebase auth ([#6](https://github.com/anli/rna-task/issues/6)) ([65d1a6c](https://github.com/anli/rna-task/commit/65d1a6c1eb1b095326be2ad6f53ec8a9f528caf2))
- **setting:** add login account information ([#30](https://github.com/anli/rna-task/issues/30)) ([96fc849](https://github.com/anli/rna-task/commit/96fc849aaaecc394696fc10402209664d3f3a252)), closes [#19](https://github.com/anli/rna-task/issues/19)
- **setting-screen, app:** add setting screen, bottom tab ([#29](https://github.com/anli/rna-task/issues/29)) ([9908e80](https://github.com/anli/rna-task/commit/9908e80ad76d0bf3f34c9921dd12c1dff7a9ce91)), closes [#18](https://github.com/anli/rna-task/issues/18)
- **task-add:** add nlp date from task name input ([#11](https://github.com/anli/rna-task/issues/11)) ([00e0ec3](https://github.com/anli/rna-task/commit/00e0ec3b7559c1c717200976d3ec9a608fe00cbb))
- **task-add:** add task add feature ([#3](https://github.com/anli/rna-task/issues/3)) ([9917c47](https://github.com/anli/rna-task/commit/9917c478713fd6c88410b876b6fbd7ad6a70dc52))
- **task-name-input:** add multiline ([#12](https://github.com/anli/rna-task/issues/12)) ([7dbdae3](https://github.com/anli/rna-task/commit/7dbdae3bef41953169c1277739879f273e61f1c9))
- **task-slice:** add taskAdapter ([#2](https://github.com/anli/rna-task/issues/2)) ([296001c](https://github.com/anli/rna-task/commit/296001cdac829d31903ac0eb33025af6ac27c20e))
- **task-update, home:** add is completed input and ux ([#10](https://github.com/anli/rna-task/issues/10)) ([d5ff86a](https://github.com/anli/rna-task/commit/d5ff86ade2af723dcec034afcb7a736e58dace06))
- **task-update, task-slice:** add TaskUpdateScreen, delete task UX ([#4](https://github.com/anli/rna-task/issues/4)) ([426c3b9](https://github.com/anli/rna-task/commit/426c3b990f7608eb25e798eeca5550241f3d8a70))
- **task-update, task-slice:** add TaskUpdateScreen, task update UX ([#5](https://github.com/anli/rna-task/issues/5)) ([25dfcd4](https://github.com/anli/rna-task/commit/25dfcd4a76dbe0164f7559e1d1e72f273a416b6e))
- **task, home, store, test:** add task feature, redux toolkit, integrate to home ([#1](https://github.com/anli/rna-task/issues/1)) ([5e5a835](https://github.com/anli/rna-task/commit/5e5a8355b17e3ed72d1cf480b5e9873f22e24d3d))
