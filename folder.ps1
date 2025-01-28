function Get-FolderStructure {
    param (
        [string]$Path = ".",
        [string]$Exclude = "node_modules"
    )

    # Get the absolute path
    $Path = Resolve-Path $Path

    # Function to recursively list folders and files
    function List-Folder {
        param (
            [string]$FolderPath,
            [string]$Indent = ""
        )

        # Get folders and files, excluding the specified folder
        $items = Get-ChildItem -Path $FolderPath -Exclude $Exclude | Sort-Object Name

        foreach ($item in $items) {
            # Print the current item
            Write-Output "$Indent$($item.Name)"

            # If it's a directory, recurse into it
            if ($item.PSIsContainer) {
                List-Folder -FolderPath $item.FullName -Indent "$Indent    "
            }
        }
    }

    # Start listing from the root path
    List-Folder -FolderPath $Path
}

# Call the function to get the folder structure
Get-FolderStructure