import { theme } from '../theme';

export const sharedStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1200px',
    padding: theme.spacing.lg,
    margin: `${theme.spacing.md} auto`,
    borderRadius: theme.borders.radius.lg,
    backgroundColor: theme.colors.cardBackground,
    border: `1px solid ${theme.colors.borderLight}`,
    boxShadow: theme.shadows.md,
  },
  
  formGroup: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  
  formLabel: {
    display: 'block',
    marginBottom: theme.spacing.sm,
    fontWeight: 500,
    color: theme.colors.textPrimary,
    textAlign: 'left',
  },
  
  input: {
    width: '100%',
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.borderLight}`,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.inputBackground,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.md,
    transition: theme.transitions.default,
  },
  
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  
  button: {
    cursor: 'pointer',
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 500,
    border: 'none',
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.buttonPrimary,
    color: theme.colors.textPrimary,
    transition: theme.transitions.default,
  },
  
  iconButton: {
    padding: theme.spacing.sm,
    border: 'none',
    borderRadius: theme.borders.radius.sm,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  
  editButton: {
    backgroundColor: theme.colors.iconButtonEdit,
    color: theme.colors.textPrimary,
  },
  
  deleteButton: {
    backgroundColor: theme.colors.iconButtonDelete,
    color: theme.colors.textPrimary,
  },
  
  saveButton: {
    backgroundColor: theme.colors.iconButtonSave,
    color: theme.colors.textPrimary,
  },
  
  cancelButton: {
    backgroundColor: theme.colors.iconButtonCancel,
    color: theme.colors.textPrimary,
  },
  
  heading: {
    color: theme.colors.textPrimary,
    marginTop: 0,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 600,
  },
  
  // Severity styles
  severityLow: { color: theme.colors.statusLow },
  severityMedium: { color: theme.colors.statusMedium },
  severityHigh: { color: theme.colors.statusHigh },
  severityCritical: { color: theme.colors.statusCritical },
  
  // Status styles
  statusOpen: { color: theme.colors.statusHigh },
  statusInProgress: { color: theme.colors.statusMedium },
  statusResolved: { color: '#48bb78' },
  statusClosed: { color: theme.colors.statusLow },
  
  // Responsive styles
  responsive: {
    mobile: `@media (max-width: ${theme.breakpoints.mobile})`,
  }
};

export default sharedStyles;
