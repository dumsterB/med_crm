## Основное
- Роуты разделяем по файлам по логическому или ролевому предназначению
- Каждый роут создаётся и экспортируется отдельным объектом, пример 
```javascript
export const APPOINTMENTS_ROUTE = {
  name: 'APPOINTMENTS_ROUTE',
  path: '/appointments',
  component: 'VAppointments',
  beforeEnter: [onlyLoggedInMiddleware, onlyManagerMiddleware],
  meta: {
    title: I18nService.t('Base.PatientsRecords'),
  },
};
```
- В компонент для роута передаётся название компонента, который соответствует `@/views/**/*.vue`
- Миддлвары добавляем в `beforeEnter`

### Дополнительно

#### Route children
- Для добавления `route.children` - не используется `children` свойство.
- Для того чтобы иметь доступ к дочернему роуту по его названию-ключу используется `childrenMap` свойство, являющееся объектом и содержащим обычные свойства роута
- Для того чтобы иметь полный доступ к url дочернего роута, добавляется `_fullPath` свойство

- Example
```javascript
export const APPOINTMENT_ROUTE = {
  name: 'APPOINTMENT_ROUTE',
  ...otherFields,

  childrenMap: {
    APPOINTMENT_ROUTE_DEFAULT_CARD: {
      name: 'APPOINTMENT_ROUTE_DEFAULT_CARD',
      path: 'default-card',
      _fullPath: '/appointments/:id/default-card',
      component: 'VAppointmentDefaultCard',
    },
    APPOINTMENT_ROUTE_INSPECTION_CARD: {
      name: 'APPOINTMENT_ROUTE_INSPECTION_CARD',
      path: 'inspection-card',
      _fullPath: '/appointments/:id/inspection-card',
      component: 'VAppointmentInspectionCard',
    },
  },
  children: [], // утилита сама подставит сюда роуты из childrenMap
};
```
