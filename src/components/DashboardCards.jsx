import React from 'react'

const Stat = ({label, value, accent}) => (
  <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-5">
    <div className="text-slate-300 text-sm">{label}</div>
    <div className={`mt-2 text-2xl font-semibold ${accent}`}>{value}</div>
  </div>
)

export default function DashboardCards({metrics}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Stat label="Clients" value={metrics.clients ?? 0} accent="text-white" />
      <Stat label="Projects" value={metrics.projects ?? 0} accent="text-white" />
      <Stat label="Total Hours" value={(metrics.total_hours ?? 0).toFixed(2)} accent="text-blue-300" />
      <Stat label="Invoiced" value={`$${(metrics.invoice_total ?? 0).toFixed(2)}`} accent="text-emerald-300" />
      <Stat label="Paid" value={`$${(metrics.payment_total ?? 0).toFixed(2)}`} accent="text-emerald-300" />
      <Stat label="Outstanding" value={`$${(metrics.outstanding ?? 0).toFixed(2)}`} accent="text-rose-300" />
    </div>
  )
}
