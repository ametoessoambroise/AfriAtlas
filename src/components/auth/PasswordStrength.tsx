interface PasswordStrengthProps {
  password?: string;
}

export default function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  // Calcul simplifié de la force
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special char

  // Mapper le score
  const config = [
    { label: "Très faible", color: "bg-red-500", width: "10%" },
    { label: "Faible", color: "bg-orange-500", width: "30%" },
    { label: "Moyen", color: "bg-yellow-500", width: "50%" },
    { label: "Fort", color: "bg-blue-500", width: "75%" },
    { label: "Très fort", color: "bg-green-500", width: "100%" },
  ];

  if (!password) return null;

  const activeLevel = config[Math.min(score, 4)];

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
          Force du mot de passe
        </span>
        <span className={`text-xs font-bold ${activeLevel.color.replace('bg-', 'text-')}`}>
          {activeLevel.label}
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden flex gap-1">
        <div 
           className={`h-full rounded-full transition-all duration-300 ${activeLevel.color}`}
           style={{ width: activeLevel.width }}
        />
      </div>
    </div>
  );
}
