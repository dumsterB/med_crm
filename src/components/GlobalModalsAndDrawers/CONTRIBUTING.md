###
Данные { payload } передаваемые в modalAndDrawers/ openModal|openDrawer попадут в пропсы самыих модалок


Для того чтобы дождаться закрытия или отправки данных из кода нужно воспользоваться след. примером
```typescript
const modalPayload: GlobalModalAction|GlobalModalCloseAction = await this.$store.dispatch("modalAndDrawer/openModal", ModalComponent)
const drawerPayload: GlobalDrawerAction|GlobalDrawerCloseAction = await this.$store.dispatch("modalAndDrawer/openDrawer", {component: DrawerComponent, payload: {}})
```

```modalAndDrawer``` vuex модуль позаботится о удалении реактивности передаваемых компонентов
