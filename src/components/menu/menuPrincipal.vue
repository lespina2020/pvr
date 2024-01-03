<template>
  <q-menu>
    <q-list dense style="min-width: 100px">
      <q-item clickable to="/">
        <q-item-section>Home</q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable>
        <q-item-section>PVR</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start">
          <q-list dense
            ><q-item clickable to="/salida">
              <q-item-section>Salida</q-item-section>
            </q-item>
            <q-item clickable to="/entrada">
              <q-item-section>Entrada</q-item-section>
            </q-item>
            <q-item clickable to="/averias">
              <q-item-section>Averias</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <q-item clickable>
        <q-item-section>Configuracion</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start">
          <q-list dense
            ><q-item clickable to="/unidades">
              <q-item-section>Unidades</q-item-section>
            </q-item>
            <q-item clickable to="/choferes">
              <q-item-section>Choferes</q-item-section>
            </q-item>
            <q-item clickable to="/ayudantes">
              <q-item-section>Ayudantes</q-item-section>
            </q-item>
            <q-item clickable to="/rutas">
              <q-item-section>Rutas</q-item-section>
            </q-item>
            <q-item clickable to="/supervisores">
              <q-item-section>Supervisores</q-item-section>
            </q-item>
            <q-item clickable to="/verificadores">
              <q-item-section>Verificadores</q-item-section>
            </q-item>
            <q-item clickable to="/usuarios">
              <q-item-section>Usuarios</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-item clickable>
        <q-item-section>Reportes</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu anchor="top end" self="top start">
          <q-list dense
            ><q-item clickable to="/cantidadPorFecha">
              <q-item-section>por Fecha </q-item-section>
            </q-item>
            <q-item clickable to="/reporteOperatividad">
              <q-item-section>Operatividad </q-item-section>
            </q-item>
            <q-item clickable to="/reporteCondicion">
              <q-item-section>Condicion </q-item-section>
            </q-item>

            <q-item clickable to="/reporteAveria">
              <q-item-section>Averia </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>

      <q-separator />
      <q-item clickable v-close-popup> </q-item>
    </q-list>
  </q-menu>
</template>
