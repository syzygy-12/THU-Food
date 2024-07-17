@echo off
setlocal

rem 首先进入db-manager文件夹并运行sbt命令
echo Running db-manager...
cd db-manager
start cmd /k "sbt clean compile run"
cd ..

rem 等待20秒
echo Waiting for 20 seconds...
timeout /t 20 /nobreak

rem 其他文件夹列表
set folders=advertisement comment entry image star tw-portal user

rem 遍历每个文件夹并在新终端中运行sbt命令
for %%f in (%folders%) do (
    echo Running %%f...
    cd %%f
    start cmd /k "sbt clean compile run"
    cd ..
)

endlocal
pause
