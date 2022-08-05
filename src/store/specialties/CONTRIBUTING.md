Загружаем с большим количеством лимитов чтобы хранить сразу всё.

Example
```typescript
if ( !this.$store.state.specialties.total ) {
  Speciality.find({per_page: 999, page: 1})
  // set in store
}
```
