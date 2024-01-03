import { fecha } from "../../../helper/validation";
const col = [
  // column Object definition
  {
    name: "unidad",
    required: true,
    label: "Unidad",
    align: "left",
    field: (row) => row.unidad,
    sortable: true,
  },
  {
    name: "placas",
    required: true,
    label: "Placas",
    align: "left",
    field: (row) => row.placa,
    sortable: true,
  },
  {
    name: "modelos",
    required: true,
    label: "Modelo",
    align: "left",
    field: (row) => row.modelo.modelo,
    sortable: true,
  },
  {
    name: "categoria",
    required: true,
    label: "Categoria",
    align: "left",
    field: (row) => row.categoria.categorias,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function column() {
  return col;
}

const reporteFechaPvr = [
  // column Object definition
  {
    name: "correlativo",
    required: true,
    label: "Correlativos",
    align: "center",
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: "placa",
    required: true,
    label: "Placas",
    align: "center",
    field: (row) => row.placa,
    sortable: true,
  },
  {
    name: "chofer",
    required: true,
    label: "Chofer",
    align: "center",
    field: (row) => row.chofer,
    sortable: true,
  },
  {
    name: "unidad",
    required: true,
    label: "Unidad",
    align: "center",
    field: (row) => row.unidad,
    sortable: true,
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "center",
    field: (row) => row.fecha,
    sortable: true,
  },
  {
    name: "horaEntrada",
    required: true,
    label: "Hora de Entrada",
    align: "center",
    field: (row) => row.pvr.isVariableEntrada.horaEntrada,
    sortable: true,
  },
  {
    name: "horaSalida",
    required: true,
    label: "Hora de Salida",
    align: "center",
    field: (row) => row.pvr.isVariableSalida.horaSalida,
    sortable: true,
  },
  {
    name: "GasoilSalida",
    required: true,
    label: "Cant.Gasoil Salida",
    align: "center",
    field: (row) => row.pvr.isVariableSalida.GsSalida,
    sortable: true,
  },
  {
    name: "GasoilEntrada",
    required: true,
    label: "Cant. Gasoil Entrada",
    align: "center",
    field: (row) => row.pvr.isVariableEntrada.GsEntrada,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Estatus",
    align: "center",
    field: (row) => row.status,
    sortable: true,
  },

  /*             <td class="text-center">{{ value.pvr.isVariableEntrada.hora }}</td>
            <td class="text-center">{{ value.pvr.isVariableSalida.hora }}</td> */
];

export function reporteFecha() {
  return reporteFechaPvr;
}
const reporteFechaPvrCondicion = [
  // column Object definition

  {
    name: "placa",
    required: true,
    label: "Placas",
    align: "center",
    field: (row) => row.placa,
    sortable: true,
  },
  {
    name: "chofer",
    required: true,
    label: "Chofer",
    align: "center",
    field: (row) => row.chofer,
    sortable: true,
  },
  {
    name: "unidad",
    required: true,
    label: "Unidad",
    align: "center",
    field: (row) => row.unidad,
    sortable: true,
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha de Entrada",
    align: "center",
    field: (row) => row.fechaEntrada,
    sortable: true,
  },
  {
    name: "horaEntrada",
    required: true,
    label: "Hora de Entrada",
    align: "center",
    field: (row) => row.horaEntrada,
    sortable: true,
  },
  {
    name: "estado",
    required: true,
    label: "Estado",
    align: "center",
    field: (row) => row.estado,
    sortable: true,
  },
  {
    name: "condicion",
    required: true,
    label: "Condicion",
    align: "center",
    field: (row) => row.condicion,
    sortable: true,
  },

  /*             <td class="text-center">{{ value.pvr.isVariableEntrada.hora }}</td>
            <td class="text-center">{{ value.pvr.isVariableSalida.hora }}</td> */
];

export function reporteFechaCondicion() {
  return reporteFechaPvrCondicion;
}

const colChoferes = [
  // column Object definition
  {
    name: "nombreApellido",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.nombreApellido,
    sortable: true,
  },
  {
    name: "Cedula",
    required: true,
    label: "Cedula de identidad",
    align: "left",
    field: (row) => row.cedula,
    sortable: true,
  },
  {
    name: "telefono",
    required: true,
    label: "Telefono",
    align: "left",
    field: (row) => row.telefono,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnChoferes() {
  return colChoferes;
}
const colUsuarios = [
  // column Object definition
  {
    name: "nombreApellido",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.firstname,
    sortable: true,
  },
  {
    name: "apellido",
    required: true,
    label: "Apellido",
    align: "left",
    field: (row) => row.lastname,
    sortable: true,
  },
  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.email,
    sortable: true,
  },

  {
    name: "Cedula",
    required: true,
    label: "Cedula",
    align: "left",
    field: (row) => row.cedula,
    sortable: true,
  },
  {
    name: "tipo",
    required: true,
    label: "Tipo de Usuario",
    align: "left",
    field: (row) => row.tipoUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnUsuarios() {
  return colUsuarios;
}

const colVerificadores = [
  // column Object definition
  {
    name: "nombreApellido",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.nombreApellido,
    sortable: true,
  },
  {
    name: "Cedula",
    required: true,
    label: "Cedula de identidad",
    align: "left",
    field: (row) => row.cedula,
    sortable: true,
  },
  {
    name: "telefono",
    required: true,
    label: "Telefono",
    align: "left",
    field: (row) => row.telefono,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnVerificadores() {
  return colVerificadores;
}

const ayudantes = [
  // column Object definition
  {
    name: "nombreApellido",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.nombreApellido,
    sortable: true,
  },
  {
    name: "Cedula",
    required: true,
    label: "Cedula de identidad",
    align: "left",
    field: (row) => row.cedula,
    sortable: true,
  },
  {
    name: "telefono",
    required: true,
    label: "Telefono",
    align: "left",
    field: (row) => row.telefono,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnAyudantes() {
  return ayudantes;
}

const rutas = [
  // column Object definition
  {
    name: "Ruta",
    required: true,
    label: "Rutas",
    align: "left",
    field: (row) => row.ruta,
    sortable: true,
  },
  {
    name: "Codigo",
    required: true,
    label: "Codigo Ruta",
    align: "left",
    field: (row) => row.codRuta,
    sortable: true,
  },
  {
    name: "Supervisor",
    required: true,
    label: "Supervisor",
    align: "left",
    field: (row) => row.idSupervisor,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnRutas() {
  return rutas;
}
const averias = [
  // column Object definition
  {
    name: "chofer",
    required: true,
    label: "Chofer",
    align: "left",
    field: (row) => row.chofer,
    sortable: true,
  },
  {
    name: "unidad",
    required: true,
    label: "unidad",
    align: "left",
    field: (row) => row.unidad,
    sortable: true,
  },
  {
    name: "averia",
    required: true,
    label: "averia",
    align: "left",
    field: (row) => row.averia,
    sortable: true,
  },
  {
    name: "hora",
    required: true,
    label: "Hora",
    align: "left",
    field: (row) => row.hora,
    sortable: true,
  },

  {
    name: "fecha",
    required: true,
    label: "Fecha",
    align: "left",
    field: (row) => row.fecha,
    sortable: true,
  },

  {
    name: "usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },
];

export function columnAverias() {
  return averias;
}

const colPvr = [
  // column Object definition
  {
    name: "Unidad",
    required: true,
    label: "Unidad",
    align: "left",
    field: (row) => row.unidad,
    sortable: true,
  },
  {
    name: "Numero",
    required: true,
    label: " # Numero de PVR",
    align: "center",
    field: (row) => `0${row.id}`,
    sortable: true,
  },
  {
    name: "placa",
    required: true,
    label: "Placa",
    align: "left",
    field: (row) => row.placa,
    sortable: true,
  },
  {
    name: "chofer",
    required: true,
    label: "Chofer",
    align: "left",
    field: (row) => row.chofer,
    sortable: true,
  },
  {
    name: "Tipo de Unidad",
    required: true,
    label: "Tipo de Unidad",
    align: "left",
    field: (row) => row.tipoUnidad,
    sortable: true,
  },
  {
    name: "Operador",
    required: true,
    label: "Operador",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fecha salida",
    required: true,
    label: "Fecha de Salidas",
    align: "left",
    field: (row) => fecha(row.fecha),
    sortable: true,
  },
  {
    name: "Fecha de Creacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
  {
    name: "ESTATUS",
    required: true,
    label: "ESTATUS PVR",
    align: "left",
    field: (row) => (row.status === true ? "ABIERTO" : "CERRADO"),
    sortable: true,
  },
];

export function columnPvr() {
  return colPvr;
}

const colCondicion = [
  // column Object definition

  {
    name: "Condicion",
    required: true,
    label: "Condicion",
    align: "left",
    field: (row) => row.condicion,
    sortable: true,
  },
  {
    name: "Tipo",
    required: true,
    label: "Tipo de Condicion",
    align: "left",
    field: (row) => row.listaTipoCondicion,

    sortable: true,
  },
  {
    name: "Observacion",
    required: true,
    label: "Obsevacion",
    align: "left",
    field: (row) => row.listaObservacion,
    sortable: true,
  },
];
export function columnCondicion() {
  return colCondicion;
}
const colSupervisores = [
  // column Object definition
  {
    name: "nombreApellido",
    required: true,
    label: "Nombre y Apellido",
    align: "left",
    field: (row) => row.nombreApellido,
    sortable: true,
  },
  {
    name: "Cedula",
    required: true,
    label: "Cedula de identidad",
    align: "left",
    field: (row) => row.cedula,
    sortable: true,
  },
  {
    name: "telefono",
    required: true,
    label: "Telefono",
    align: "left",
    field: (row) => row.telefono,
    sortable: true,
  },

  {
    name: "Usuario",
    required: true,
    label: "Usuario",
    align: "left",
    field: (row) => row.idUsuario,
    sortable: true,
  },

  {
    name: "Fechacreacion",
    required: true,
    label: "Fecha de Creacion",
    align: "left",
    field: (row) => new Date(row.createdAt).toLocaleString(),
    sortable: true,
  },
];

export function columnSupervisores() {
  return colSupervisores;
}
